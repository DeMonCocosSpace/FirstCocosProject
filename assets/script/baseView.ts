// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Utils from "./Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    mAlert: cc.Prefab = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

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


        // resources
        // cc.resources.load('alert/alert', function (err, prefab) {
        //     var node = cc.instantiate(prefab);
        //     this.node.addChild(node);
        //     var alert = node.getComponent('alert')
        //     alert.show('Hello prefab~',
        //         function () {
        //             cc.log('用户点击了ok');
        //         },
        //         function () { cc.log('用户点击了cancel'); },
        //         function () { cc.log('用户点击了ok'); })
        // }.bind(this));

        // 静态方法全局调用
        Utils.showAlert(this.node);

    }

    // update (dt) {}
}
