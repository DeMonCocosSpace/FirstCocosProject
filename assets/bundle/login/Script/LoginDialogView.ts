import BundleCenter from "../../../main/core/bd/BundleCenter";
import { BundleName } from "../../../main/core/conf/BundleName";
import StorageManager from "../../../main/core/storage/StorageManager";
import CacheUtils from "../../../main/core/utils/CacheUtils";
import HttpUtils from "../../../main/core/http/HttpUtils";
import { Toast } from "../../common/Script/commpent/UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoginDialogView extends cc.Component {
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

        const username = this.etAccount.string;
        const password = this.etPassword.string;

        if (username.isEmpty() || password.isEmpty()) {
            Toast.show("请填写账号or密码～");
            return;
        }
        const json = {
            username: username,
            password: password,
        };
        HttpUtils.getHttp()
            .post("1.1/login", json)
            .then((json) => {
                Toast.show("Login succeed~");
                CacheUtils.getInstance().setAccountInfo(json);
                if (this.cbSave.isChecked) {
                    StorageManager.getInstance().setItem("account_info", JSON.stringify(json));
                }
                this.hide();
                BundleCenter.getInstance().launchSence(BundleName.PLAZA);
            });
    }
    onClickRegister() {
        window["LoginView"].showRegister();
        this.hide();
    }
    onClickClose() {
        this.hide();
    }

    // update (dt) {}
}
