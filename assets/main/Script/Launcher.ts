import BundleCenter from "../core/bd/BundleCenter";
import { BundleName } from "../core/conf/BundleName";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Launcher extends cc.Component {
    @property(cc.ProgressBar)
    progress: cc.ProgressBar = null;

    onLoad() {
        this.progress.progress = 0;

        this.schedule(this.toLogin, 1);
    }

    toLogin() {
        if (this.progress.progress >= 1) {
            cc.log("Login");
            //取消定时器
            this.unschedule(this.toLogin);

            BundleCenter.getInstance().launchSence(BundleName.LOGIN);
        } else {
            cc.log("Loading");
        }
    }

    update(dt) {
        if (this.progress.progress < 1) {
            this.progress.progress += dt;
        }
    }
}
