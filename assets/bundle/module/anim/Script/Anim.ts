import { ResLoader } from "../../../../main/core/bd/ResLoader";
import BtnView from "../../../common/Script/BtnView";
import { UI } from "../../../common/Script/commpent/UIMgr";
import CommonSkin from "../../../common/Script/conf/CommonSkin";
import AnimSkin from "./conf/AnimSkin";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Anim extends cc.Component {
    @property(cc.Layout)
    layout: cc.Layout = null;
    @property(cc.Sprite)
    bg: cc.Sprite = null;

    private AnimConf = null;

    onLoad() {
        this.AnimConf = [
            {
                prefab: AnimSkin.UnPriority.AnimDialogView,
                title: "缩放",
            },
            {
                prefab: AnimSkin.UnPriority.FrameView,
                title: "帧动画",
            },
            {
                prefab: AnimSkin.UnPriority.MonsterView,
                title: "动作系统",
            },
        ];
        UI.setBg(this.bg);

        this.AnimConf.forEach((value, i, _) => {
            const pf = cc.instantiate(
                ResLoader.getInstance().getPrefab(CommonSkin.Priority.BtnView)
            );
            const ctrl = pf.getComponent(BtnView);
            ctrl.init({
                label: value.title,
                data: value,
                callback: () => {
                    this.onClick(value);
                },
            });
            this.layout.node.addChild(pf);
        });
    }

    onClick(value: any) {
        const path: string = value.prefab.resPath;
        const index = path.lastIndexOf("/") + 1;
        const name: string = path.substring(index, path.length);
        cc.log("prefab.name=" + name);

        UI.showUI(value.prefab, { args: [name] });
    }
}
