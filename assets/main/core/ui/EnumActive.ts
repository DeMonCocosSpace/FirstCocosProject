import BaseEnumComp from "./BaseEnumComp";

const { ccclass, property, executeInEditMode, menu } = cc._decorator;

export enum EnumActiveType {
    HideAll,
    ShowFirstChild,
}

@ccclass
@executeInEditMode
@menu("core/controller/EnumActive")
export default class EnumActive extends BaseEnumComp {
    @property(cc.Node)
    private childs: cc.Node[] = [];

    public get curentNode() {
        return this.childs[this.activeIndex - 1];
    }

    protected onFocusInEditor(): void {
        let enumMap: { [key: string]: number } = {
            "<None>": 0,
        };
        this.getChilds().forEach((v, i) => {
            enumMap[v?.name ?? "<Unknown>"] = i + 1;
        });
        cc.Class["Attr"].setClassAttr(this, "activeIndex", "enumList", cc.Enum["getList"](enumMap));
    }

    public getChilds() {
        if (!this.childs.length) {
            return this.node.children;
        }
        return this.childs;
    }

    protected updateActive(): void {
        const value = this.activeIndex;
        this.getChilds().forEach((node, index) => {
            node.active = index + 1 == value;
        });
    }
    // update (dt) {}
}
