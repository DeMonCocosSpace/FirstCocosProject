const { ccclass, property } = cc._decorator;

@ccclass
export default class BottomMenuView extends cc.Component {
    @property(cc.Node)
    btnExpand: cc.Node = null;
    @property(cc.Node)
    btnClose: cc.Node = null;
    @property(cc.Node)
    bg: cc.Node = null;
    private mExpand = false;
    private mClose = false;

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
                if (this.bg.x < 250) {
                    this.bg.x = 250;
                    this.mExpand = false;
                }
            }
            if (this.mClose) {
                this.bg.x += posx;
                if (this.bg.x > 640) {
                    this.bg.x = 640;
                    this.mClose = false;
                }
            }
        }
    }
}
