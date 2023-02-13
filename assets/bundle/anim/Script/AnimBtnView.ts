// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ResLoader from "../../../main/core/bd/ResLoader";
import CocosUtils from "../../../main/core/utils/CocosUtils";
import AnimDialogView from "./AnimDialogView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AnimView extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;

    protected onLoad(): void {}

    private value: any = null;

    public static map: Map<string, cc.Node> = new Map();

    init(value: any) {
        this.value = value;

        this.label.string = value.title;
    }

    onClick() {
        const path: string = this.value.prefab.resPath;
        const index = path.lastIndexOf("/") + 1;
        const name: string = path.substring(index, path.length);
        cc.log("prefab.name=" + name);
        let node: cc.Node = AnimView.map.get(name);
        if (node == undefined) {
            ResLoader.getInstance().loadPrefab(this.value.prefab, (prefab: cc.Prefab) => {
                node = cc.instantiate(prefab);
                CocosUtils.getInstance().getSceneCanvas().addChild(node);
                AnimView.map.set(name, node);
                this.show(node, name);
            });
        } else {
            this.show(node, name);
        }
    }

    private show(node: cc.Node, name: string) {
        const ctrl = node.getComponent(name);
        switch (name) {
            case "AnimDialogView":
                ctrl.setConetnt("Hello Cocos~").showView();
                break;
            default:
                ctrl.show();
                break;
        }
    }
}
