"use strict";
const Path = require("fire-path");
const path = require("path");
const fs = require("fs");
const { dialog } = require("electron");

const assetsPathToDirPath = function (resPath) {
    const reg = /^(db):\/\/(\S*)/;
    const dbPaths = resPath.match(reg);
    if (!dbPaths) return null;
    return dbPaths[2];
};

const title = "皮肤拷贝";

module.exports = {
    load() {},
    unload() {
        // execute when package unloaded
    },
    copySkin() {
        const currentSelection = Editor.Selection.curSelection("asset");
        if (!currentSelection || currentSelection.length == 0) {
            Editor.warn("请选择需要拷贝的皮肤目录");
            return;
        }
        // 获取右键选择到的路径uuid
        const selectedUuid = currentSelection[0];
        // 选择的资源目录
        const selectedUrl = Editor.assetdb.uuidToUrl(selectedUuid);

        // skin 绝对 路径
        const currSkinDirPath = path.join(Editor.Project.path, assetsPathToDirPath(selectedUrl));

        if (!fs.existsSync(currSkinDirPath)) {
            Editor.warn("目录不存在");
            return;
        }

        if (this.isFile(currSkinDirPath)) {
            Editor.warn("请选择目录进行拷贝");
            return;
        }
        let tipContext = `是否从选中目录拷贝皮肤？\n ${selectedUrl}`;
        // 弹出确认框，避免误操作
        dialog
            .showMessageBox({
                title: title,
                noLink: true,
                type: "warning",
                message: tipContext,
                detail: "注意！拷贝过程中请勿切换后台",
                buttons: ["拷贝", "取消"],
                defaultId: 0,
                cancelId: 1,
            })
            .then((ob) => {
                if (ob.response == 0) {
                    this.copyStart(selectedUuid);
                }
            });
    },
    copyStart(selectedUuid) {
        // 选择的资源目录
        const selectedUrl = Editor.assetdb.uuidToUrl(selectedUuid);
        // skin目录
        const skinDirUrl = Path.dirname(selectedUrl);

        // Path.dirname 获取选中目录的上一级目录
        // Path.basenameNoExt 获取资源路径的最后目录名

        // Editor.log(
        //     "资源目录路径",
        //     skinDirUrl,
        //     selectedUrl,
        //     Path.basenameNoExt(selectedUrl),
        //     Editor.Project.path
        // );

        // if (Path.basenameNoExt(skinDirUrl) !== "skin") {
        //     Editor.warn("请选择皮肤目录！");
        //     return;
        // }

        // 当前选择的皮肤dir名
        const currSkinName = Path.basenameNoExt(selectedUrl);

        if (currSkinName == "assets") {
            Editor.warn("请选择assets下的目录");
            return;
        }

        // 获取一个新的皮肤dir名
        const newSkinName = this.getNewSinkName(
            path.join(Editor.Project.path, assetsPathToDirPath(skinDirUrl)),
            currSkinName,
            0
        );

        // skin 绝对 路径
        const currSkinDirPath = path.join(Editor.Project.path, assetsPathToDirPath(selectedUrl));

        // 新皮肤 绝对 路径
        const newSkinDirPath = path.join(
            Editor.Project.path,
            assetsPathToDirPath(skinDirUrl),
            newSkinName
        );

        // 创建临时资源缓存目录
        const tempPath = path.join(Editor.Project.path, "../", "skin-temp");
        if (fs.existsSync(tempPath)) {
            this.removeDir(tempPath);
        }

        Editor.log("当前资源目录", currSkinDirPath);
        Editor.log("新资源目录", newSkinDirPath);

        // 读取目录所有资源，并将资源拷贝到临时目录
        const filesList = this.copyFileToTemp(
            currSkinDirPath,
            currSkinDirPath,
            tempPath,
            newSkinDirPath,
            []
        );

        // 新皮肤的项目路径 db://xxxx/xxxx/xxx;
        const newAssetsRootUrl = skinDirUrl + `/${newSkinName}/`;
        const currAssetsRootUrl = selectedUrl + "/";

        // 读取所有资源的UUID
        const currUUidMap = this.getCurrResUUIDList(currSkinDirPath, currAssetsRootUrl, filesList);
        // Editor.log("所有资源的UUID", currUUidMap);

        Editor.info("开始刷新资源目录");

        // 刷新新皮肤资源目录
        this.refreshAssetsDir(newAssetsRootUrl)
            .then(() => {
                Editor.info("开始导入资源");
                // 将文件依次导入
                return this.importAssets(
                    tempPath,
                    newAssetsRootUrl,
                    this.sortAssetsList([...filesList])
                );
            })
            .then((resUuidMap) => {
                Editor.info("开始替换prefab资源UUID");
                // 获取新旧UUID对比数组 number[][olduuid, newuuid]
                const replaceUUIDList = this.getOldNewResUUIDArr(currUUidMap, resUuidMap);
                // 获取所有的prefab资源;
                const prefabPaths = this.getPrefabResPath(filesList);
                // 替换所有prefab中的UUID
                return this.replaceAllPrefab(newSkinDirPath, replaceUUIDList, prefabPaths);
            })
            .then(() => {
                Editor.info("替换prefab资源UUID完成，开始更新prefab信息");
                // 替换后将刷新一次prefab资源
                const prefabPaths = this.getPrefabResPath(filesList);
                return this.refreshAssets(newAssetsRootUrl, prefabPaths);
            })
            .then(() => {
                Editor.info("清理临时缓存目录");
                if (fs.existsSync(tempPath)) {
                    this.removeDir(tempPath);
                }

                Editor.info("拷贝成功");

                dialog.showMessageBox({
                    title: title,
                    noLink: true,
                    type: "none",
                    message: "皮肤拷贝成功!",
                    buttons: ["OK"],
                    defaultId: 0,
                });
            })
            .catch((e) => {
                Editor.error(e);
            });
    },

    // 刷新目录
    refreshAssetsDir(newAssetRoot) {
        return new Promise((resolve) => {
            Editor.assetdb.refresh(newAssetRoot, function (err, results) {
                if (!err) {
                    resolve();
                } else {
                    Editor.error("更新目录错误", err);
                }
            });
        });
    },

    // 刷新资源
    refreshAssets(newAssetsRootUrl, assetsList, index = 0) {
        if (assetsList.length == index) return Promise.resolve();
        const item = assetsList[index];
        const assetsPath = newAssetsRootUrl + item;

        const prms = new Promise((resolve) => {
            Editor.assetdb.refresh(assetsPath, function (err, results) {
                if (err) {
                    Editor.error("prefab 资源刷新失败", err);
                }
                resolve();
            });
        });

        return prms.then(() => {
            index++;
            return this.refreshAssets(newAssetsRootUrl, assetsList, index);
        });
    },

    // 导入所有资源
    importAssets(tempPath, newAssetRoot, list, index = 0, newResUuidMap = {}) {
        if (index == list.length) return Promise.resolve(newResUuidMap);

        const item = list[index];
        const parse = path.parse(item);

        const respath = newAssetRoot + parse.dir;
        const fsPath = path.join(tempPath, item);

        const pms = new Promise((resolve) => {
            // if (parse.ext == ".ts" || parse.ext == ".js") return resolve();

            Editor.assetdb.import([fsPath], respath, (err, results) => {
                if (!err) {
                    // 循环处理导入资源生成的meta信息
                    for (const res of results) {
                        const key = path.join("/", res.url.split(newAssetRoot)[1], res.type);
                        if (res.type == "typescript" || res.type == "javascript") {
                            continue;
                            // newResUuidMap[key] = Editor.Utils.UuidUtils.compressUuid(res.uuid);
                        } else {
                            newResUuidMap[key] = res.uuid;
                        }
                    }
                    Editor.log(`导入成功 ${item}`);
                } else {
                    Editor.error(`导入失败 ${item}`, err);
                }
                resolve();
            });
        });

        return pms.then(() => {
            index++;
            return this.importAssets(tempPath, newAssetRoot, list, index, newResUuidMap);
        });
    },

    // 将资源排序，按照资源类型顺序导入， 图片优先
    sortAssetsList(list) {
        list.sort((a, b) => {
            const aext = path.parse(a).ext;
            const bext = path.parse(b).ext;

            let an = 0;
            let bn = 0;

            if (aext == ".png" || aext == ".jpg") {
                an = 0;
            } else if (aext == ".atlas") {
                an = 1;
            } else if (aext == ".prefab" || bext == ".fire") {
                an = 5;
            } else {
                an = 2;
            }

            if (bext == ".png" || bext == ".jpg") {
                bn = 0;
            } else if (bext == ".atlas") {
                bn = 1;
            } else if (bext == ".prefab" || bext == ".fire") {
                bn = 5;
            } else {
                bn = 2;
            }

            return an - bn;
        });

        return list;
    },

    // 获取当前皮肤下所有资源的UUID Map {[rPath]: string}
    getCurrResUUIDList(skinPath, currAssetsRootUrl, list) {
        const pathUuidMap = {};
        // const uuidPathMap = {};

        for (const item of list) {
            let resPath = path.join(skinPath, item) + ".meta";

            const parse = path.parse(item);
            const base = path.join(parse.dir, parse.base);

            if (!resPath) continue;

            // 读取meta文件获取完整的UUID信息
            try {
                const data = fs.readFileSync(resPath, "utf8");
                const json = JSON.parse(data);

                // 获取资源信息
                const assetInfo = Editor.assetdb.assetInfoByUuid(json.uuid);

                if (assetInfo) {
                    const key = path.join(
                        "/",
                        assetInfo.url.split(currAssetsRootUrl)[1],
                        assetInfo.type
                    );

                    if (json.importer == "typescript" || json.importer == "javascript") {
                        continue;
                        // pathUuidMap[key] = Editor.Utils.UuidUtils.compressUuid(json.uuid);
                    } else {
                        pathUuidMap[key] = json.uuid;
                    }

                    if (json.subMetas) {
                        this.getMetaSubMetas(json.subMetas, currAssetsRootUrl, pathUuidMap);
                    }
                }
            } catch (e) {
                Editor.error("读取UUID失败", e);
            }
        }
        return pathUuidMap;
    },

    // 获取meta文件的子资源UUID
    getMetaSubMetas(subMetas, currAssetsRootUrl, map) {
        for (const name in subMetas) {
            const item = subMetas[name];

            // 获取资源信息
            const assetInfo = Editor.assetdb.assetInfoByUuid(item.uuid);
            if (assetInfo) {
                const key = path.join(
                    "/",
                    assetInfo.url.split(currAssetsRootUrl)[1],
                    assetInfo.type
                );

                if (item.importer == "typescript" || item.importer == "javascript") {
                    continue;
                    // map[key] = Editor.Utils.UuidUtils.compressUuid(item.uuid);
                } else {
                    map[key] = item.uuid;
                }
            }

            if (item.subMetas) {
                this.getMetaSubMetas(item.subMetas, currAssetsRootUrl, map);
            }
        }
    },

    // 获取一个拷贝皮肤的新名称
    getNewSinkName(skinPath, currSkinName, index = 0) {
        const newSkinName = currSkinName + "_copy" + (index > 0 ? "_" + index : "");
        const newSkinPath = path.join(skinPath, newSkinName);
        if (fs.existsSync(newSkinPath)) {
            index++;
            return this.getNewSinkName(skinPath, currSkinName, index);
        }
        return newSkinName;
    },

    // 拷贝并记录所有资源路径
    copyFileToTemp(currPath, rootPath, tempPath, newSkinDirPath, list) {
        if (!fs.existsSync(tempPath)) {
            fs.mkdirSync(tempPath);
        }

        if (!fs.existsSync(newSkinDirPath)) {
            fs.mkdirSync(newSkinDirPath);
        }

        try {
            const files = fs.readdirSync(currPath);
            for (const pf of files) {
                const nextPath = path.join(currPath, pf);
                const targetFilePath = path.join(tempPath, pf);
                const newSkinFilePath = path.join(newSkinDirPath, pf);
                if (this.isFile(nextPath)) {
                    if (pf.indexOf(".meta") >= 0 || pf.indexOf(".DS_Store") >= 0) continue;
                    list.push(path.join("/", nextPath.split(rootPath)[1]));
                    fs.copyFileSync(nextPath, targetFilePath);
                    // fs.copyFileSync(nextPath, newSkinFilePath);
                    continue;
                } else if (this.isDirectory(nextPath)) {
                    this.copyFileToTemp(nextPath, rootPath, targetFilePath, newSkinFilePath, list);
                }
            }
        } catch (e) {
            Editor.error("copyFileToTemp", e);
        }
        return list;
    },

    isFile(strPath) {
        const stat = fs.statSync(strPath);
        return stat.isFile();
    },

    isDirectory(strPath) {
        const stat = fs.statSync(strPath);
        return stat.isDirectory();
    },

    removeDir(dirPath) {
        if (!fs.existsSync(dirPath)) return;
        if (this.isFile(dirPath)) {
            fs.unlinkSync(dirPath);
        } else if (this.isDirectory(dirPath)) {
            try {
                const list = fs.readdirSync(dirPath);
                for (const childPath of list) {
                    this.removeDir(path.join(dirPath, childPath));
                }
                fs.rmdirSync(dirPath);
            } catch (e) {
                Editor.error("removeDir", e);
            }
        }
    },

    // 获取所有的prefab或者场景资源路径
    getPrefabResPath(list) {
        const newList = [];
        for (const item of list) {
            const parse = path.parse(item);
            const ext = parse.ext;
            if (ext == ".prefab" || ext == ".fire") {
                newList.push(item);
            }
        }

        return newList;
    },

    // 获取老资源与新资源的UUID数组 string[][]
    getOldNewResUUIDArr(oldList, newList) {
        const uuidList = [];
        for (const key in oldList) {
            const oldUUID = oldList[key];
            const newUUID = newList[key];
            if (!newUUID) {
                Editor.error("导入资源失败或缺少资源类型", key);
                continue;
            }
            uuidList.push([oldUUID, newUUID]);
        }
        return uuidList;
    },

    // 替换所有prefab中的UUID资源
    replaceAllPrefab(newSkinRoot, uuidList, prefabPathList, index = 0) {
        if (prefabPathList.length == index) return Promise.resolve();
        const item = prefabPathList[index];
        const resPath = path.join(newSkinRoot, item);

        const prms = new Promise((resolve) => {
            fs.readFile(resPath, "utf8", (err, data) => {
                if (err) {
                    Editor.error("替换prefab UUID失败", err, resPath);
                } else {
                    try {
                        data = this.replacePrefabUUID(uuidList, data);
                        fs.writeFileSync(resPath, data);
                        resolve();
                    } catch (e) {
                        resolve();
                        Editor.error("替换prefab UUID失败", e, resPath);
                    }
                }
            });
        });

        return prms.then(() => {
            index++;
            return this.replaceAllPrefab(newSkinRoot, uuidList, prefabPathList, index);
        });
    },

    // 替换一个prefab中的UUID
    replacePrefabUUID(uuidList, prefabContent) {
        for (const item of uuidList) {
            const oldUUID = this.stringFormat(item[0]);
            const newUUID = this.stringFormat(item[1]);
            const reg = new RegExp(oldUUID, "g");
            prefabContent = prefabContent.replace(reg, newUUID);
        }
        return prefabContent;
    },

    stringFormat(str) {
        str = str
            .replace(/\\/g, "\\\\") // 一定要将此规则放在第一个替换，因为其他的替换都增加 "\" 符号
            .replace(/\//g, "\\/")
            .replace(/!/g, "\\!")
            .replace(/@/g, "\\@")
            .replace(/#/g, "\\#")
            .replace(/\$/g, "\\$")
            .replace(/&/g, "\\&")
            .replace(/\*/g, "\\*")
            .replace(/=/g, "\\=")
            .replace(/\?/g, "\\?")
            .replace(/\+/g, "\\+");
        return str;
    },

    // register your ipc messages here
    messages: {
        open() {
            // open entry panel registered in package.json
            Editor.Panel.open("easy-copy-skin");
        },
        "say-hello"() {
            Editor.log("Hello easy-skin-copy!");
            // send ipc message to panel
            //Editor.Ipc.sendToPanel("easy-copy-skin", "easy-copy-skin:hello");
            this.copySkin();
        },
        clicked() {
            Editor.log("Button clicked!");
        },
    },
};
