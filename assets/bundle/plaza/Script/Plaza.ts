import ResLoader from "../../../main/core/bd/ResLoader";
import { PlazaConf } from "./conf/PlazaConf";
import CommonSkin from "../../common/Script/conf/CommonSkin";
import PlazaSkin from "./conf/PlazaSkin";
import PlazaBtnView from "./PlazaBtnView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Plaza extends cc.Component {
    @property(cc.Layout)
    layout: cc.Layout = null;

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    private bgScrollView: cc.Sprite = null;

    onLoad() {
        this.bgScrollView = this.scrollView.getComponent(cc.Sprite);

        this.bgScrollView.spriteFrame = ResLoader.getInstance().getSpriteFrame(
            CommonSkin.Priorty.bgSkin
        );

        PlazaConf.forEach((value, i, _) => {
            const pf = cc.instantiate(
                ResLoader.getInstance().getPrefab(PlazaSkin.Priorty.PlazaBtnView)
            );
            const ctrl = pf.getComponent(PlazaBtnView);
            ctrl.init(value);
            this.layout.node.addChild(pf);
        });
    }

    update(dt) {}
}
