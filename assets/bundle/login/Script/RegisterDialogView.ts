const { ccclass, property } = cc._decorator;

@ccclass
export default class RegisterDialogView extends cc.Component {
    start() {}

    show() {
        this.node.active = true;
    }
    onClickOk() {}

    onClickClose() {
        this.node.active = false;
    }
}
