import BundleCenter from "../core/bd/BundleCenter";
import { BundleName } from "../core/conf/BundleName";
import Flavor from "../core/conf/Flavor";
import { SkinType } from "../core/conf/SkinType";
import CacheUtils from "../core/utils/CacheUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Launcher extends cc.Component {
    @property(cc.ProgressBar)
    progress: cc.ProgressBar = null;

    onLoad() {
        const sceneName = cc.director.getScene().name;
        cc.log(sceneName);

        switch (sceneName) {
            case "LauncherAnt":
                Flavor.Skin.currMainSkin = SkinType.ANT;
                break;
            case "LauncherCar":
                Flavor.Skin.currMainSkin = SkinType.CAR;
                break;
        }

        this.progress.progress = 0;

        this.schedule(this.toLogin, 1);

        CacheUtils.getInstance().initDataCache();
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
