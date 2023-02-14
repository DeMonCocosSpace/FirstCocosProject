import CocosUtils from "../../../main/core/utils/CocosUtils";
import BasePrefabView from "../../../main/core/ui/BasePrefabView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HallView extends BasePrefabView {
    @property(cc.Sprite)
    bg: cc.Sprite = null;

    onLoad() {
        CocosUtils.getInstance().setBg(this.bg);
    }

    goback(): void {
        CocosUtils.getInstance().goPlaza();
    }

    // update (dt) {}
}
