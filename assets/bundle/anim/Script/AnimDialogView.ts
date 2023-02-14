import BasePrefabView from "../../../main/core/ui/BasePrefabView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AnimDialogView extends BasePrefabView {
    // LIFE-CYCLE CALLBACKS:

    @property(cc.Node)
    bg: cc.Node = null;
    @property(cc.Label)
    content: cc.Label = null;

    private anim: cc.Animation = null;

    private isShow = false;

    playFinish(type: string, state: cc.AnimationState) {
        cc.log("playFinish: " + type + ",name=" + state.name);
    }

    hidePlayEnd() {
        cc.log("Dialog hidePlayEnd");
        this.isShow = false;
        this.hide();
    }

    onLoad() {
        this.hide();
        this.anim = this.bg.getComponent(cc.Animation);
        //on注册可以解决子节点的帧事件函数无法在父节点被找到的问题
        //相对来说又不够灵活
        this.anim.on(cc.Animation.EventType.FINISHED, this.playFinish, this);
    }

    // update (dt) {}

    setConetnt(content: string): AnimDialogView {
        this.content.string = content;
        return this;
    }

    showView() {
        if (this.isShow) {
            return;
        }
        cc.log("Doalog Show~");
        this.isShow = true;
        this.show();
        this.anim.play("ScaleToShow");
    }

    hideView() {
        this.anim.play("ScaleToHide");
    }

    agree() {
        cc.log("同意");
        this.hideView();
    }
    disAgree() {
        cc.log("不同意");
        this.hideView();
    }
}
