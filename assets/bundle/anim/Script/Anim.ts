import ResLoader from "../../../main/core/bd/ResLoader";
import AnimSkin from "./conf/AnimSkin";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Anim extends cc.Component {
    protected onLoad(): void {
        const node = cc.instantiate(ResLoader.getInstance().getPrefab(AnimSkin.Priorty.AnimView));
        this.node.addChild(node);
    }
}
