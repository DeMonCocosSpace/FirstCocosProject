import AnimDialogView from "./AnimDialogView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AnimDialogBg extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {}

    //子节点的帧事件函数无法在父节点被找到
    //需要单独脚本注册帧事件函数
    hidePlayEnd() {
        cc.log("DialogBg hidePlayEnd");
        let dialog = this.node.parent.getComponent(AnimDialogView);
        dialog.hidePlayEnd();
    }

    // update (dt) {}
}
