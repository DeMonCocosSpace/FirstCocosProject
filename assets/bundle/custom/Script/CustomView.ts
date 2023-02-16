import ResLoader from "../../../main/core/bd/ResLoader";
import { Log } from "../../../main/core/Log";
import { Alert, Loading } from "../../common/Script/commpent/UIMgr";
import CustomSkin from "./conf/CustomSkin";
import ProgressView from "./ProgressView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CustomView extends cc.Component {
    private progress: ProgressView = null;

    start() {}

    protected onLoad(): void {
        const node = cc.instantiate(
            ResLoader.getInstance().getPrefab(CustomSkin.Priority.BottomMenuView)
        );
        this.node.addChild(node);
    }

    showAlert() {
        Alert.showAlert("Hello Cocos~");
    }

    @Log.method
    showProgress() {
        ResLoader.getInstance().loadPrefab(CustomSkin.UnPriority.ProgressVew, (pf: cc.Prefab) => {
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

    @Loading.applyLoading
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
