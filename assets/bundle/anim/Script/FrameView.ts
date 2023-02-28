import { CocosUtils } from "../../../main/core/utils/CocosUtils";
import BasePrefabView from "../../../main/core/ui/BasePrefabView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FrameView extends BasePrefabView {
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    effect: cc.Node = null;
    @property(cc.Button)
    play: cc.Button = null;

    private anim: cc.Animation = null;

    onLoad() {
        this.hide();

        CocosUtils.getInstance().setBtn(this.play);
        CocosUtils.getInstance().setBg(this.node.getComponent(cc.Sprite));

        this.anim = this.effect.getComponent(cc.Animation);
    }

    playEffect() {
        this.anim.play();
    }
    // update (dt) {}
}
