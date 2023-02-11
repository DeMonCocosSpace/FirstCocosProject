// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ResLoader from "../../../main/core/bd/ResLoader";
import CocosUtils from "../../../main/core/CocosUtils";
import AnimDialogView from "./AnimDialogView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AnimView extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;

    protected onLoad(): void {}

    private prefab: cc.Prefab = null;

    init(value: any) {
        ResLoader.getInstance().loadPrefab(value.prefab, (prefab: cc.Prefab) => {
            this.prefab = prefab;
        });
        this.label.string = value.title;
    }

    onClick() {
        const node = cc.instantiate(this.prefab);
        CocosUtils.getInstance().getSceneCanvas().addChild(node);

        cc.log("prefab.name=" + this.prefab.name);

        switch (this.prefab.name) {
            case "AnimDialogView":
                const ctrl: AnimDialogView = node.getComponent(AnimDialogView);
                ctrl.setConetnt("Hello Cocos~").show();
                break;
            default:
                break;
        }
    }
}
