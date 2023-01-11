// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class BottomMenu extends cc.Component {
    @property(cc.Node)
    btnExpand: cc.Node = null;
    @property(cc.Node)
    btnClose: cc.Node = null;

    private mExpand = false;
    private mClose = false;

    // LIFE-CYCLE CALLBACKS:

    private widget: cc.Widget = null;
    onLoad() {
        this.widget = this.node.getComponent(cc.Widget);
    }

    start() {}

    onclickExpand() {
        if (this.mExpand || this.mClose) {
            return;
        }
        this.mExpand = true;
        this.mClose = false;
        this.btnExpand.active = false;
        this.btnClose.active = true;
    }

    onclickClose() {
        if (this.mExpand || this.mClose) {
            return;
        }
        this.mExpand = false;
        this.mClose = true;
        this.btnExpand.active = true;
        this.btnClose.active = false;
    }

    update(dt) {
        if (this.mExpand || this.mClose) {
            var posx = dt * 500;
            if (this.mExpand) {
                this.node.x -= posx;
                if (this.node.x < 300) {
                    this.node.x = 300;
                    this.mExpand = false;
                }
            }
            if (this.mClose) {
                this.node.x += posx;
                if (this.node.x > 640) {
                    this.node.x = 640;
                    this.mClose = false;
                }
            }
        }
    }
}
