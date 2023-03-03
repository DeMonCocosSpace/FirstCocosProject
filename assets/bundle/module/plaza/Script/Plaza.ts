import { ResLoader } from "../../../../main/core/bd/ResLoader";
import { PlazaConf } from "./conf/PlazaConf";
import CommonSkin from "../../../common/Script/conf/CommonSkin";
import BtnView from "../../../common/Script/BtnView";
import BundleCenter from "../../../../main/core/bd/BundleCenter";
import { CocosUtils } from "../../../../main/core/utils/CocosUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Plaza extends cc.Component {
    @property(cc.Node)
    layout: cc.Node = null;

    @property(cc.Node)
    scrollView: cc.Node = null;

    onLoad() {
        CocosUtils.getInstance().setNodeBg(this.scrollView);
        PlazaConf.forEach((value, i, _) => {
            const pf = cc.instantiate(
                ResLoader.getInstance().getPrefab(CommonSkin.Priority.BtnView)
            );
            const ctrl = pf.getComponent(BtnView);
            ctrl.init({
                label: value.title,
                data: value.bundle,
                callback: () => {
                    BundleCenter.getInstance().launchSence(value.bundle);
                },
            });
            this.layout.addChild(pf);
        });
    }

    update(dt) {}
}
