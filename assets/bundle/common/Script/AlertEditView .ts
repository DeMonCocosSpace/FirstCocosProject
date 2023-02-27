const { ccclass, property } = cc._decorator;

@ccclass
export default class AlertEditView extends cc.Component {
    @property(cc.EditBox)
    label: cc.EditBox = null;
    @property(cc.Button)
    ok: cc.Button = null;
    @property(cc.Button)
    cancel: cc.Button = null;

    private okcallback: (content: string) => void;
    private cancelcallback: () => void;

    start() {}

    build(tip: string, okcallback, cancelcallback) {
        this.setContent(tip);
        this.okcallback = okcallback;
        this.cancelcallback = cancelcallback;
        return this;
    }

    show() {
        this.node.active = true;
        this.enabled = true;
    }
    dismiss() {
        this.node.active = false;
        this.enabled = false;
    }

    okFun() {
        this.okcallback(this.label.string);
        this.dismiss();
    }

    cancelFun() {
        this.cancelcallback();
        this.dismiss();
    }

    setContent(tips: string) {
        this.label.string = tips;
    }
}
