import PopUpViewBase from "../../../../main/core/ui/popup/PopUpViewBase";
import { UI } from "../../../common/Script/commpent/UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FrameView extends PopUpViewBase {
    @property(cc.Node)
    effect: cc.Node = null;
    @property(cc.Button)
    play: cc.Button = null;

    private anim: cc.Animation = null;

    onLoad() {
        this.hasBack = true;
        UI.setBtn(this.play);
        UI.setBg(this.node.getComponent(cc.Sprite));

        this.anim = this.effect.getComponent(cc.Animation);
    }

    playEffect() {
        this.anim.play();
    }
}
