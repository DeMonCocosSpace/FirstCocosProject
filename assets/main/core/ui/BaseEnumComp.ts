const { ccclass, property, executeInEditMode, menu } = cc._decorator;

export enum EnumActiveType {
    HideAll,
    ShowFirstChild,
}

@ccclass
@executeInEditMode
@menu("core/ui/BaseEnumComp")
export default abstract class BaseEnumComp extends cc.Component {
    @property
    private _activeIndex: number = 0;

    @property({ type: cc.Enum({}) })
    public get activeIndex() {
        return this._activeIndex;
    }

    public set activeIndex(value: EnumActiveType | number) {
        this._activeIndex = value;
        this.updateActive();
    }

    public show4Name(nodeName: string) {
        this.activeIndex =
            this.getChilds().findIndex((item) => {
                return item.name === nodeName;
            }) + 1;
    }

    public get currentName() {
        return this.getChilds()?.[this.activeIndex - 1]?.name;
    }

    public abstract getChilds(): { name: string; [index: string]: any }[];

    protected abstract updateActive(): void;

    // update (dt) {}
}
