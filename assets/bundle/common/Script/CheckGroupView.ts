import { ResLoader } from "../../../main/core/bd/ResLoader";
import CheckBoxView from "./CheckBoxView";
import CommonSkin from "./conf/CommonSkin";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CheckGroupView extends cc.Component {
    private childs: string[] = [];
    private index = -1;

    private callback?: (index: number, v: string) => void = null;

    public init(childs: string[], callback?: (index: number, v: string) => void) {
        this.childs = childs;
        this.callback = callback;
        childs.forEach((element, index) => {
            const node = cc.instantiate(
                ResLoader.getInstance().getPrefab(CommonSkin.Priority.CheckBoxView)
            );
            this.node.addChild(node);
            const ctrl: CheckBoxView = node.getComponent(CheckBoxView);
            ctrl.init(element);
            ctrl.setCheck(index == 0);
        });
    }

    onToggle(toggle: cc.Toggle) {
        const ctrl: CheckBoxView = toggle.getComponent(CheckBoxView);
        const newIndex = this.childs.indexOf(ctrl.text);
        if (newIndex != this.index) {
            this.index = newIndex;
            this.callback?.(this.index, ctrl.text);
        }
    }
}
