// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Loading from "./Loading";
const { ccclass, property } = cc._decorator;

@ccclass
export default class LoginView extends cc.Component {
    @property(cc.EditBox)
    etAccount: cc.EditBox = null;
    @property(cc.EditBox)
    etPassword: cc.EditBox = null;
    @property(cc.Toggle)
    cbSave: cc.Toggle = null;

    onLoad() {}

    start() {}

    show() {
        this.node.active = true;
    }
    hide() {
        this.node.active = false;
    }
    onClickLogin() {
        cc.log("Account:" + this.etAccount.string);
        cc.log("Password:" + this.etPassword.string);
        cc.log("AutoSave:" + this.cbSave.isChecked);

        //切换场景
        cc.director.loadScene("Plaza");
    }
    onClickRegister() {
        const load = this.node.parent.getComponent(Loading);
        if (load != null) {
            load.showRegister();
        }
        this.hide();
    }
    onClickClose() {
        this.hide();
    }

    // update (dt) {}
}
