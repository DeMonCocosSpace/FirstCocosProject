import ResLoader from "../../../main/core/bd/ResLoader";
import CocosUtils from "../../../main/core/utils/CocosUtils";
import AnimBtnView from "./AnimBtnView";
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
        CocosUtils.getInstance().setBg(this.bg);

        this.AnimConf.forEach((value, i, _) => {
            const pf = cc.instantiate(
                ResLoader.getInstance().getPrefab(AnimSkin.Priority.AnimBtnView)
            );
            const ctrl = pf.getComponent(AnimBtnView);
            ctrl.init(value);
            this.layout.node.addChild(pf);
        });
    }

    update(dt) {}
}
