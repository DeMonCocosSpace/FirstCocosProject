import AlertUtils from "../../../main/core/AlertUtils";
import ResLoader from "../../../main/core/bd/ResLoader";
import CustomSkin from "./conf/CustomSkin";
import ProgressView from "./ProgressView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CustomView extends cc.Component {
    private progress: ProgressView = null;

    start() {}

    protected onLoad(): void {
        const node = cc.instantiate(
            ResLoader.getInstance().getPrefab(CustomSkin.Priorty.BottomMenuView)
        );
        this.node.addChild(node);
    }

    showAlert() {
        AlertUtils.showAlert("Hello Cocos~");
    }

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

    protected update(dt: number): void {
        if (this.progress && !this.progress.isMax()) {
            this.progress.setProgress(this.progress.curPro + dt * 100);
        }
    }
}
