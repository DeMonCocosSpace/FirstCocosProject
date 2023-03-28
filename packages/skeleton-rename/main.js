"use strict";

let isSelectAsset = false;
const assetsPathToDirPath = function (resPath) {
    const reg = /^(db):\/\/(\S*)/;
    const dbPaths = resPath.match(reg);
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
        // 当 package 被正确加载的时候执行
        this.registerClickMenu();
    },

    unload() {
        // 当 package 被正确卸载的时候执行
    },

    messages: {
        "say-hello"() {
            Editor.log("Hello World~");
        },
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

            let template = [
                {
                    type: "separator",
                },

                {
                    label: "骨骼动画资源改名",
                    click: () => {
                        //Editor.Ipc.sendToPanel('unpack-textureatlas.unpack', null);

                        const currentSelection = Editor.Selection.curSelection("asset");

                        if (!currentSelection || currentSelection.length == 0) {
                            Editor.warn("选择文件异常～");
                            return;
                        }
                        const selectPath = Editor.assetdb.uuidToUrl(currentSelection);
                        Editor.log("当前选择文件: " + selectPath);
                    },
                },
            ];
            v_as[0].push(...template);
        });
    },
};
