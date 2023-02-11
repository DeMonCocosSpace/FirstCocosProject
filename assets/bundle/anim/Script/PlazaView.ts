import CocosUtils from "../../../main/core/CocosUtils";
import BasePrefabView from "../../../main/core/widget/BasePrefabView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Plaza extends BasePrefabView {
    @property(cc.Sprite)
    bg: cc.Sprite = null;

    onLoad() {
        this.hide();
        CocosUtils.getInstance().setBg(this.bg);
    }

    // update (dt) {}
}
