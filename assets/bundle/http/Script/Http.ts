import { ResLoader } from "../../../main/core/bd/ResLoader";
import { CocosUtils } from "../../../main/core/utils/CocosUtils";
import HttpSkin from "./conf/HttpSkin";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Http extends cc.Component {
    onLoad() {
        const hallView = cc.instantiate(
            ResLoader.getInstance().getPrefab(HttpSkin.Priority.HttpView)
        );
        hallView.setPosition(cc.v2(0, 0));
        this.node.addChild(hallView);
    }

    start() {}

    // update (dt) {}
}
