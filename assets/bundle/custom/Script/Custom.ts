import { ResLoader } from "../../../main/core/bd/ResLoader";
import CustomSkin from "./conf/CustomSkin";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Custom extends cc.Component {
    protected onLoad(): void {
        const view = cc.instantiate(
            ResLoader.getInstance().getPrefab(CustomSkin.Priority.CustomView)
        );
        this.node.addChild(view);
    }
}
