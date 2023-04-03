"use strict";
const path = require("path");
const fs = require("fs");
let isSelectAsset = false;

const assetsPathToDirPath = function (resPath) {
    const reg = /^(db):\/\/(.*)/;
    const dbPaths = resPath.match(reg);
    Editor.info("选择的文件路径:" + dbPaths);
    if (!dbPaths) return null;
    return dbPaths[2];
};

function hook_function(param1, param2, param3) {
    let add = function () {
        return param3(arguments), new param1(...arguments);
    };
    let obj = Object["getOwnPropertyNames"](param1);

    for (let i of obj) {
        const object = Object["getOwnPropertyDescriptor"](param1, i);

        if (object["writable"]) {
            add[i] = param1[i];
        }
    }
    return (add["prototype"] = param1["prototype"]), add;
}

module.exports = {
    load() {
        Editor.log("load");
        // 当 package 被正确加载的时候执行
        this.registerClickMenu();
    },

    unload() {
        // 当 package 被正确卸载的时候执行
    },

    messages: {},
    isFile(strPath) {
        const stat = fs.statSync(strPath);
        return stat.isFile();
    },
    registerClickMenu() {
        // 扩展右键菜单
        let ipc_listen_o = new Editor.IpcListener();
        ipc_listen_o.on("selection:context", function () {
            //Editor.log(arguments, 'arguments');
            if (arguments[1] == "asset") {
                isSelectAsset = true;
                //// curSelectAsset = arguments[2] ? Editor.assetdb.uuidToFspath(arguments[2]) : null;
            } else {
                isSelectAsset = false;
            }
        });

        if (Editor["__hookedEditorMenu__"] != undefined) {
            return;
        }

        Editor["__hookedEditorMenu__"] = true;

        const self = this;
        Editor.Menu = hook_function(Editor.Menu, {}, function (v_as) {
            // 获取挡圈选中路径
            const currentSelection = Editor.Selection.curSelection("asset");
            let selectedUrl = null;
            if (currentSelection && currentSelection.length > 0) {
                selectedUrl = Editor.assetdb.uuidToUrl(currentSelection[0]);
            }

            // 悬停目录
            const hoveringPath = Editor.assetdb.uuidToUrl(Editor.Selection.hovering("asset"));

            // 鼠标悬停和选中不是在同一目录则不显示菜单
            if (!isSelectAsset || hoveringPath != selectedUrl) {
                return;
            }

            let templates = [];

            Editor.info("选择的文件路径:" + selectedUrl);
            Editor.info("选择的文件路径:" + assetsPathToDirPath(selectedUrl));
            // skin 绝对 路径
            const currSkinDirPath = path.join(
                Editor.Project.path,
                assetsPathToDirPath(selectedUrl)
            );
            Editor.info("选择的文件绝对路径:" + currSkinDirPath);

            //皮肤拷贝插件, 选择的必须是文件夹
            if (fs.existsSync(currSkinDirPath) && !self.isFile(currSkinDirPath)) {
                templates.push({
                    type: "separator",
                });
                templates.push({
                    label: "皮肤拷贝",
                    click: () => {
                        //Editor.Ipc.sendToPanel('unpack-textureatlas.unpack', null);
                        Editor.Ipc.sendToMain("easy-skin-copy:say-hello");
                    },
                });
            }

            //骨骼动画资源改名插件, 必须选择的是骨骼资源的json文件
            if (selectedUrl.endsWith(".json")) {
                templates.push({
                    type: "separator",
                });
                templates.push({
                    label: "骨骼动画资源改名",
                    click: () => {
                        //Editor.Ipc.sendToPanel('unpack-textureatlas.unpack', null);
                        Editor.Ipc.sendToMain("easy-skeleton-rename:say-hello");
                    },
                });
            }

            v_as[0].push(...templates);
        });
    },
};
