import { ResLoader } from "../../../../main/core/bd/ResLoader";
import AudioManager from "../../../../main/core/media/AudioManager";
import HallSkin from "./conf/HallSkin";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Hall extends cc.Component {
    onLoad() {
        const hallView = cc.instantiate(
            ResLoader.getInstance().getPrefab(HallSkin.Priority.HallView)
        );
        this.node.addChild(hallView);
    }

    start() {
        AudioManager.getInstance().playMusic(HallSkin.UnPriority.HallBgm);
    }

    protected onDestroy(): void {
        AudioManager.getInstance().stopMusic();
    }
}
