import ResLoader from "../../../main/core/bd/ResLoader";
import LoginSkin from "./conf/LoginSkin";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Login extends cc.Component {
    start() {}

    protected onLoad(): void {
        const loginView = cc.instantiate(
            ResLoader.getInstance().getPrefab(LoginSkin.Priority.LoginView)
        );
        this.node.addChild(loginView);
    }
}
