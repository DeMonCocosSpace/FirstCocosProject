import BasePrefabView from "../../../main/core/ui/BasePrefabView";
import HttpUtils from "../../../main/core/utils/HttpUtils";
import { Toast } from "../../common/Script/commpent/UIMgr";
import Http from "../../http/Script/Http";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RegisterDialogView extends BasePrefabView {
    @property(cc.EditBox)
    etAccount: cc.EditBox = null;
    @property(cc.EditBox)
    etPassword: cc.EditBox = null;
    @property(cc.EditBox)
    etAgain: cc.EditBox = null;

    start() {}

    protected onLoad(): void {
        this.show();
    }

    onClickOk() {
        const username = this.etAccount.string;
        const password = this.etPassword.string;
        const again = this.etAgain.string;
        if (username.isEmpty() || password.isEmpty() || again.isEmpty()) {
            Toast.show("注册信息不完整～");
            return;
        }
        if (password != again) {
            Toast.show("两次密码输入不一致～");
            return;
        }
        const json = {
            username: username,
            password: password,
        };

        HttpUtils.post("1.1/users", json).then((json) => {
            Toast.show("Register succeed~");
            this.hide();
        });
    }

    onClickClose() {
        this.hide();
    }
}
