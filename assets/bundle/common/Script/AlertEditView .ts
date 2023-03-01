import PopUpViewBase from "../../../main/core/ui/popup/PopUpViewBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AlertEditView extends PopUpViewBase {
    @property(cc.EditBox)
    label: cc.EditBox = null;
    @property(cc.Button)
    ok: cc.Button = null;
    @property(cc.Button)
    cancel: cc.Button = null;

    public init(tips: string): void {
        this.setContent(tips);
    }

    okFun() {
        this.close(this.label.string);
    }

    cancelFun() {
        this.close(null);
    }

    setContent(tips: string) {
        this.label.string = tips;
    }
}
