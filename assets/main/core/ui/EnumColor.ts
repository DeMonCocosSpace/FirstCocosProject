import BaseEnumComp from "./BaseEnumComp";
import { _ColorItem } from "./item/_ColorItem";

const { ccclass, property, executeInEditMode, menu } = cc._decorator;

@ccclass
@executeInEditMode
@menu("core/controller/EnumColor")
export default class EnumColor extends BaseEnumComp {
    @property(_ColorItem)
    private childs: _ColorItem[] = [];

    protected onFocusInEditor(): void {
        let enumMap: { [key: string]: number } = {
            "<None>": 0,
        };
        this.getChilds().forEach((v, i) => {
            enumMap[v?.name ?? "<Unknown>"] = i + 1;
        });
        cc.Class["Attr"].setClassAttr(this, "activeIndex", "enumList", cc.Enum["getList"](enumMap));
    }

    public getChilds(): { name: string; value: cc.Color }[] {
        return this.childs.map((v) => {
            return {
                name: v.key,
                value: v.value,
            };
        });
    }

    protected updateActive(): void {
        const value = this.activeIndex - 1;
        this.node.color = this.getChilds()?.[value]?.value ?? cc.color();
    }
    // update (dt) {}
}
