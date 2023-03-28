// panel/index.js, this filename needs to match the one registered in package.json
const Path = require("fire-path");
const path = require("path");
let filePath = "";
let originFileName = "";
const fs = require("fs");

const assetsPathToDirPath = function (resPath) {
    const reg = /^(db):\/\/(\S*)/;
    const dbPaths = resPath.match(reg);
    if (!dbPaths) return null;
    return dbPaths[2];
};

Editor.Panel.extend({
    // css style for panel
    style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
  `,

    // html template for panel
    template: `
    <div>骨骼动画json路径: <span id="path">--</span></div>
    <hr />
    <div>修改后的文件名: <ui-input id="edit" placeholder="修改后的文件名"/></ui-input></div>
    <hr />
    <div>State: <span id="label">--</span></div>
    <hr />
    <ui-button id="btn">确定</ui-button>
  `,

    // element and variable binding
    $: {
        path: "#path",
        btn: "#btn",
        label: "#label",
        edit: "#edit",
    },
    // method executed when template and styles are successfully loaded and initialized
    ready() {
        this.$btn.addEventListener("confirm", () => {
            if (this.$edit.value == originFileName) {
                this.$label.innerText = "无须更改~";
                Editor.warn("文件名与当前一致，无须更改~");
                return;
            }
            this.$label.innerText = "开始~";
            const fileDir = Path.dirname(filePath);
            //绝对路径
            const currfileDir = path.join(Editor.Project.path, assetsPathToDirPath(fileDir));
            Editor.info("文件夹的绝对路径: " + currfileDir);
            const files = fs.readdirSync(currfileDir);
            const reallFiles = files.filter((value) => {
                return !value.endsWith(".meta") && value.startsWith(originFileName);
            });
            Editor.info("骨骼动画资源: " + reallFiles);
            //检查图集，json，png
            if (
                reallFiles.indexOf(originFileName + ".json") != -1 &&
                reallFiles.indexOf(originFileName + ".atlas") != -1 &&
                reallFiles.indexOf(originFileName + ".png") != -1
            ) {
                Editor.info("初步校验通过~骨骼动画资源: " + reallFiles);
                const newFileName = this.$edit.value;
                fs.rename(
                    currfileDir + "/" + originFileName + ".png",
                    currfileDir + "/" + newFileName + ".png",
                    (err) => {
                        if (err) throw err;
                        Editor.info(originFileName + ".png-->" + newFileName + `.png,修改成功~`);
                    }
                );
                fs.rename(
                    currfileDir + "/" + originFileName + ".json",
                    currfileDir + "/" + newFileName + ".json",
                    (err) => {
                        if (err) throw err;
                        Editor.info(originFileName + ".json-->" + newFileName + `.json,修改成功~`);
                    }
                );
                //修改图集第一行的png文件名
                const atlasFileContent =
                    fs.readFileSync(currfileDir + "/" + originFileName + ".atlas") + "";
                const newContent = atlasFileContent.replace(
                    originFileName + ".png",
                    newFileName + ".png"
                );
                fs.writeFileSync(currfileDir + "/" + originFileName + ".atlas", newContent);

                fs.rename(
                    currfileDir + "/" + originFileName + ".atlas",
                    currfileDir + "/" + newFileName + ".atlas",
                    (err) => {
                        if (err) throw err;
                        Editor.info(
                            originFileName + ".atlas-->" + newFileName + `.atlas,修改成功~`
                        );
                    }
                );
                Editor.assetdb.refresh(fileDir, (err, results) => {
                    if (err) {
                        Editor.error("资源刷新失败", err);
                    }
                    this.$label.innerText = "修改成功~";
                });
            } else {
                Editor.warn("骨骼动画资源数量异常~");
                this.$label.innerText = "骨骼动画资源数量异常~";
                return;
            }
        });
    },
    run(argv) {
        filePath = argv;
        this.$path.innerText = argv;
        originFileName = Path.basenameNoExt(filePath);
        this.$edit.value = originFileName;
    },
    // register your ipc messages here
    messages: {},
});
