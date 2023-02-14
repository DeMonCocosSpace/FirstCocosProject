import { lodash } from "../NpmExport";
import { Tools } from "../Tools";
import BaseEnumComp from "./BaseEnumComp";

const { ccclass, property, executeInEditMode, menu } = cc._decorator;

export enum EnumActiveType {
    HideAll,
    ShowFirstChild,
}

@ccclass
@executeInEditMode
@menu("core/controller/EnumController")
export default class EnumController extends BaseEnumComp {
    private _allChildNames: string[] = [];

    @property(BaseEnumComp)
    private childs: BaseEnumComp[] = [];

    public setChilds(childs: BaseEnumComp[]): void {
        this.childs = childs;
        this.resetChilds();
    }

    public show4Name(nodeName: string) {
        this.activeIndex = this._allChildNames.indexOf(nodeName);
    }

    protected onFocusInEditor(): void {
        let enumMap: { [key: string]: number } = {
            "<None>": 0,
        };

        this._allChildNames.forEach((childName, i) => {
            enumMap[childName ?? "<Unknown>"] = i;
        });
        cc.Class["Attr"].setClassAttr(this, "activeIndex", "enumList", cc.Enum["getList"](enumMap));
    }

    protected onLoad(): void {
        this.resetChilds();
    }

    public resetChilds() {
        let allChildsNames = new Set<string>();
        this.getAllChilds().forEach((v) => {
            v.getChilds().forEach((item) => {
                allChildsNames.add(item.name);
            });
        });
        this._allChildNames = [...allChildsNames];
    }

    public getChilds(): { [index: string]: any; name: string }[] {
        return this._allChildNames.map((v) => {
            return {
                name: v,
            };
        });
    }

    public getAllChilds(): BaseEnumComp[] {
        if (!this.childs.length) {
            return this.getComponentsInChildren(BaseEnumComp);
        }

        return lodash
            .chain(this.childs)
            .map((v) => {
                if (v instanceof EnumController) {
                    return this.getComponentsInChildren(BaseEnumComp).filter((v) => {
                        return v.node == this.node;
                    });
                }
                return v;
            })
            .reduce((pre, cur) => {
                return pre.concat(...Tools.toArray(cur));
            }, [] as BaseEnumComp[])
            .filter((v) => !(v instanceof EnumController))
            .value();
    }

    protected updateActive(): void {
        const value = this.activeIndex;
        const actieName = this.getChilds()?.[value]?.name ?? "";
        this.getAllChilds().forEach((comp, index) => {
            comp.show4Name(actieName);
        });
    }

    // update (dt) {}
}
