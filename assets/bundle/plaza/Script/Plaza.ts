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

    private bgLayout: cc.Sprite = null;

    onLoad() {
        this.bgLayout = this.layout.getComponent(cc.Sprite);

        this.bgLayout.spriteFrame = ResLoader.getInstance().getSpriteFrame(
            CommonSkin.Priorty.bgSkin
        );

        PlazaConf.forEach((value, i, _) => {
            const pf = cc.instantiate(
                ResLoader.getInstance().getPrefab(PlazaSkin.Priorty.PlazaBtnView)
            );
            const ctrl = pf.getComponent(PlazaBtnView);
            ctrl.init(value);
            this.bgLayout.node.addChild(pf);
        });
    }

    update(dt) {}
}
