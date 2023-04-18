import { PlayButtonSoundUtils } from "../../utils/PlayButtonSoundUtils";
import { PopupUtil } from "./PopupUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PopUpViewBase extends PopupUtil.BasePopup {
    private _hasBack = false;

    public set hasBack(v: boolean) {
        this._hasBack = v;
    }

    public onConstruct(): void {
        PlayButtonSoundUtils.getInstance().buttonPlaySoundHandle(this.node);
    }

    public init(...args: any[]): void {}
    public ready(...args: any[]): void {}
    protected onShow(): Promise<void> {
        return new Promise<void>((resolve) => {
            if (CC_DEBUG) {
                CC_DEBUG && cc.log("open win ====> " + this.node.name);
            }

            if (!this._content) {
                resolve();
                return;
            }
            cc.tween<cc.Node>(this._content)
                .set({ scale: 0 })
                .to(0.15, { scale: 1 }, { easing: "backOut" })
                .call(() => {
                    resolve();
                })
                .start();
        });
    }

    protected onHide(): Promise<void> {
        return new Promise<void>((resolve) => {
            if (!this._content) {
                resolve();
                return;
            }
            cc.tween<cc.Node>(this._content)
                .call(() => {
                    this.showSwallow();
                })
                .to(0.15, { scale: 0 }, { easing: "backIn" })
                .call(() => {
                    resolve();
                })
                .start();
        });
    }
    protected async onClose(...args): Promise<void> {}

    private showSwallow() {
        let swallowNode = new cc.Node();
        swallowNode.width = cc.winSize.width;
        swallowNode.height = cc.winSize.height;
        swallowNode.addComponent(cc.BlockInputEvents);
        this.node.addChild(swallowNode, 10);
    }
}
