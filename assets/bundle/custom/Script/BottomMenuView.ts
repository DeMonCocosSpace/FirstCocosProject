import PopUpViewBase from "../../../main/core/ui/popup/PopUpViewBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BottomMenuView extends PopUpViewBase {
    @property(cc.Node)
    btnExpand: cc.Node = null;
    @property(cc.Node)
    btnClose: cc.Node = null;
    @property(cc.Node)
    bg: cc.Node = null;
    private mExpand = false;
    private mClose = false;

    private closeX = 0;
    private expandX = 0;
    public onLoad(): void {
        this.closeX = cc.winSize.width / 2 - this.bg.width / 4;
        this.expandX = cc.winSize.width / 2 - this.bg.width;

        this.bg.setPosition(this.closeX, this.bg.position.y);
    }

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
                this.bg.x -= posx;
                if (this.bg.x < this.expandX) {
                    this.bg.x = this.expandX;
                    this.mExpand = false;
                }
            }
            if (this.mClose) {
                this.bg.x += posx;
                if (this.bg.x > this.closeX) {
                    this.bg.x = this.closeX;
                    this.mClose = false;
                }
            }
        }
    }
}
