import CocosUtils from "../../../main/core/CocosUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Plaza extends cc.Component {
    @property(cc.Sprite)
    bg: cc.Sprite = null;

    start() {}

    protected onLoad(): void {
        this.node.active = true;
        this.enabled = true;
        CocosUtils.getInstance().setBg(this.bg);
    }

    goback() {
        this.node.active = false;
        this.enabled = false;
    }
    // update (dt) {}
}
