const { ccclass, property } = cc._decorator;

@ccclass
export default class AlertView extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Button)
    ok: cc.Button = null;
    @property(cc.Button)
    cancel: cc.Button = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    private okcallback: () => void;
    private cancelcallback: () => void;

    start() {}

    build(tip: string, okcallback, cancelcallback) {
        this.setTips(tip);
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
        cc.log("okFun");
        this.okcallback();

        this.dismiss();
    }

    cancelFun() {
        cc.log("cancelFun");
        this.cancelcallback();
        this.dismiss();
    }

    setTips(tips: string) {
        this.label.string = tips;
    }
}
