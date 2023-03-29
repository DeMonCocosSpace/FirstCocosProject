"use strict";
const Path = require("fire-path");

module.exports = {
    load() {
        // 当 package 被正确加载的时候执行
    },

    unload() {
        // 当 package 被正确卸载的时候执行
    },

    messages: {
        "say-hello"() {
            Editor.log("Hello easy-skeleton-rename!");

            const currentSelection = Editor.Selection.curSelection("asset");

            if (!currentSelection || currentSelection.length == 0) {
                Editor.warn("选择文件异常～");
                return;
            }
            const selectPath = Editor.assetdb.uuidToUrl(currentSelection);
            Editor.info("当前选择文件: " + selectPath);
            Editor.Panel.open("easy-skeleton-rename", selectPath);
        },
    },
};
