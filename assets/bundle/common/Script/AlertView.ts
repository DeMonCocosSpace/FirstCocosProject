import PopUpViewBase from "../../../main/core/ui/popup/PopUpViewBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AlertView extends PopUpViewBase {
    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Button)
    ok: cc.Button = null;
    @property(cc.Button)
    cancel: cc.Button = null;

    public init(tip: string): void {
        this.setTips(tip);
    }

    okFun() {
        this.close(true);
    }

    cancelFun() {
        this.close(false);
    }

    setTips(tips: string) {
        this.label.string = tips;
    }
}
