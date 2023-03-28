import { ResLoader } from "../../../../main/core/bd/ResLoader";
import { Log } from "../../../../main/core/Log";
import PopUpViewBase from "../../../../main/core/ui/popup/PopUpViewBase";
import { Alert, Loading, Toast, UI } from "../../../common/Script/commpent/UIMgr";
import UiSkin from "./conf/UISkin";
import ProgressView from "./ProgressView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UiView extends PopUpViewBase {
    private progress: ProgressView = null;

    start() {}

    protected onLoad(): void {
        UI.showUISync(UiSkin.Priority.BottomMenuView);
    }

    showAlert() {
        Alert.showAlert(
            "Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~Hello Cocos~"
        ).then((res) => {
            Toast.show("showAlert=" + res);
        });
    }

    @Log.method
    showProgress() {
        ResLoader.getInstance().loadPrefab(UiSkin.UnPriority.ProgressVew, (pf: cc.Prefab) => {
            const node = cc.instantiate(pf);
            node.y = -100;
            this.node.addChild(node);
            this.progress = node.getComponent(ProgressView);
            this.progress.finishCallback = () => {
                cc.log("progress finishCallback");
            };
            // let timer = setInterval(function () {

            //     clearInterval(timer);
            // }, 500);
        });
    }

    loading1() {
        const promise = new Promise<string>((resolve, reject) => {
            cc.log("PlazaBtnView loading1");
            setTimeout(() => {
                resolve("123");
            }, 3000);
        });
        Loading.applyLoading(promise);
    }

    @Loading.applyLoading
    loading2(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            cc.log("PlazaBtnView loading2");
            setTimeout(() => {
                resolve("123");
            }, 3000);
        });
    }

    @Loading.applyLoading(true)
    async loading3() {
        cc.log("PlazaBtnView loading3");
        return this.loading2();
    }

    protected update(dt: number): void {
        if (this.progress && !this.progress.isMax()) {
            this.progress.setProgress(this.progress.curPro + dt * 100);
        }
    }
}
