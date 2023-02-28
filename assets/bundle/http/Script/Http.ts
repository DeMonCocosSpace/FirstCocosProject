import { ResLoader } from "../../../main/core/bd/ResLoader";
import HttpSkin from "./conf/HttpSkin";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Http extends cc.Component {
    onLoad() {
        const hallView = cc.instantiate(
            ResLoader.getInstance().getPrefab(HttpSkin.Priority.HttpView)
        );
        this.node.addChild(hallView);
    }

    start() {}

    // update (dt) {}
}
