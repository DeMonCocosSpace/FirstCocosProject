import ResLoader from "../../../main/core/bd/ResLoader";
import CommonSkin from "../../common/Script/conf/CommonSkin";
import AnimBtnView from "./AnimBtnView";
import { AnimConf } from "./conf/AnimConf";
import AnimSkin from "./conf/AnimSkin";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Anim extends cc.Component {
    @property(cc.Layout)
    layout: cc.Layout = null;

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Sprite)
    bg: cc.Sprite = null;

    private bgScrollView: cc.Sprite = null;

    onLoad() {
        this.bg.spriteFrame = ResLoader.getInstance().getSpriteFrame(CommonSkin.Priorty.bgSkin);

        AnimConf.forEach((value, i, _) => {
            const pf = cc.instantiate(
                ResLoader.getInstance().getPrefab(AnimSkin.Priorty.AnimBtnView)
            );
            const ctrl = pf.getComponent(AnimBtnView);
            ctrl.init(value);
            this.layout.node.addChild(pf);
        });
    }

    update(dt) {}
}
