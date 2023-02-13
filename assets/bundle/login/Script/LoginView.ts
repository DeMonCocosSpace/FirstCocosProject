import BundleCenter from "../../../main/core/bd/BundleCenter";
import ResLoader from "../../../main/core/bd/ResLoader";
import { BundleName } from "../../../main/core/conf/BundleName";
import LoginSkin from "./conf/LoginSkin";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoginView extends cc.Component {
    start() {}

    protected onLoad(): void {
        window["LoginView"] = this;
    }

    onClickRegisrer() {
        this.showRegister();
    }

    onClickLogin() {
        const pf = cc.instantiate(
            ResLoader.getInstance().getPrefab(LoginSkin.Priority.LoginDialogView)
        );
        this.node.addChild(pf);
    }

    onClickGuest() {
        BundleCenter.getInstance().launchSence(BundleName.PLAZA);
    }

    showRegister() {
        const pf = cc.instantiate(
            ResLoader.getInstance().getPrefab(LoginSkin.Priority.RegisterDialogView)
        );
        this.node.addChild(pf);
    }
}
