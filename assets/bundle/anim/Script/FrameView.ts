import CocosUtils from "../../../main/core/CocosUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FrameView extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    effect: cc.Node = null;
    @property(cc.Button)
    play: cc.Button = null;

    private anim: cc.Animation = null;

    onLoad() {
        this.node.active = true;
        this.enabled = true;

        CocosUtils.getInstance().setBtn(this.play);
        CocosUtils.getInstance().setBg(this.node.getComponent(cc.Sprite));

        this.anim = this.effect.getComponent(cc.Animation);
    }

    start() {}

    goback() {
        this.node.active = false;
        this.enabled = false;
    }

    playEffect() {
        this.anim.play();
    }
    // update (dt) {}
}
