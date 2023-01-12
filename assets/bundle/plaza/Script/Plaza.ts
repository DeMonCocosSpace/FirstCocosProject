// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Utils from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Plaza extends cc.Component {
    @property(cc.Prefab)
    mAlert: cc.Prefab = null;
    @property(cc.ProgressBar)
    progressBar = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.progressBar.progress = 0;
    }

    start() {}

    clickBtn() {
        // 预制体addChild
        // var node = cc.instantiate(this.mAlert);

        // this.node.addChild(node);

        // var alert = node.getComponent('alert')
        // alert.show('Hello prefab~',
        //     function () {
        //         cc.log('用户点击了ok');
        //     },
        //     function () { cc.log('用户点击了cancel'); },
        //     function () { cc.log('用户点击了ok'); })

        // 静态方法全局调用
        Utils.showAlert(this.node);
    }

    update(dt) {
        if (this.progressBar.progress < 1) {
            this.progressBar.progress += dt / 5;
        }
    }
}