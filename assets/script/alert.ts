// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Button)
    ok: cc.Button = null;
    @property(cc.Button)
    cancel: cc.Button = null;
    @property(cc.Button)
    close: cc.Button = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    private okcallback: () => void;
    private cancelcallback: () => void;
    private closecallback: () => void;

    start() {

    }

    show(tip: string, okcallback, cancelcallback, closecallback) {
        this.setTips(tip);
        this.okcallback = okcallback;
        this.cancelcallback = cancelcallback;
        this.closecallback = closecallback;
    }

    okFun() {
        cc.log('okFun');
        this.okcallback();
    }

    cancelFun() {
        cc.log('cancelFun');
        this.cancelcallback();
    }

    closeFun() {
        cc.log('closeFun');
        this.node.active = false;
        this.closecallback();
    }

    setTips(tips: string) {
        this.label.string = tips;
    }

    // update (dt) {}
}
