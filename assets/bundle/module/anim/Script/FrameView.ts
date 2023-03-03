import { CocosUtils } from "../../../../main/core/utils/CocosUtils";
import BasePrefabView from "../../../../main/core/ui/BasePrefabView";
import PopUpViewBase from "../../../../main/core/ui/popup/PopUpViewBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FrameView extends PopUpViewBase {
    @property(cc.Node)
    effect: cc.Node = null;
    @property(cc.Button)
    play: cc.Button = null;

    private anim: cc.Animation = null;

    onLoad() {
        CocosUtils.getInstance().setBtn(this.play);
        CocosUtils.getInstance().setBg(this.node.getComponent(cc.Sprite));

        this.anim = this.effect.getComponent(cc.Animation);
    }

    playEffect() {
        this.anim.play();
    }
}
