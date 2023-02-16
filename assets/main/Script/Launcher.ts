import BundleCenter from "../core/bd/BundleCenter";
import { BundleName } from "../core/conf/BundleName";
import Flavor from "../core/conf/Flavor";
import { SkinType } from "../core/conf/SkinType";
import AudioManager from "../core/media/AudioManager";
import StorageManager from "../core/storage/StorageManager";
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

        CacheUtils.getInstance().initDataCache();
        StorageManager.getInstance().initPrefix("project_");
        AudioManager.getInstance().init();

        this.toLogin();
    }

    toLogin() {
        cc.log("Login");
        BundleCenter.getInstance()
            .launchSence(BundleName.LOGIN)
            .onProgress((t, v) => {
                cc.log("Launcher t=" + t + " ,v=" + v);
                this.progress.progress = v / t;
            });
    }
}
