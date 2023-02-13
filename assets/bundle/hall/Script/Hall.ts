import ResLoader from "../../../main/core/bd/ResLoader";
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

    start() {}
}
