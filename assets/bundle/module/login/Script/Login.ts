import { UI } from "../../../common/Script/commpent/UIMgr";
import LoginSkin from "./conf/LoginSkin";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Login extends cc.Component {
    start() {}

    protected onLoad(): void {
        UI.showUI(LoginSkin.Priority.LoginView);
    }
}
