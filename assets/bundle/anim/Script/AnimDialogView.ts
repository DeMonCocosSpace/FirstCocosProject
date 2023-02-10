// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class AnimDialogView extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    @property(cc.Node)
    bg: cc.Node = null;

    private anim: cc.Animation = null;

    private isShow = false;

    onLoad() {
        //enable组件可以控制BlockInputEvents是否生效
        this.enabled = false;
        ////active = false时BlockInputEvents仍然生效
        this.node.active = false;

        this.anim = this.bg.getComponent(cc.Animation);
        //on注册可以解决子节点的帧事件函数无法在父节点被找到的问题
        //相对来说又不够灵活
        this.anim.on(cc.Animation.EventType.FINISHED, this.playFinish, this);
    }

    playFinish(type: string, state: cc.AnimationState) {
        cc.log("playFinish: " + type + ",name=" + state.name);
    }

    hidePlayEnd() {
        cc.log("Dialog hidePlayEnd");
        this.isShow = false;
        this.node.active = false;
        this.enabled = false;
    }

    start() {}

    // update (dt) {}

    show() {
        if (this.isShow) {
            return;
        }
        cc.log("Doalog Show~");
        this.isShow = true;
        this.enabled = true;
        this.node.active = true;
        this.anim.play("ScaleToShow");
    }

    hide() {
        this.anim.play("ScaleToHide");
    }
}
