const { ccclass, property, executeInEditMode, menu } = cc._decorator;

@ccclass("_ColorItem")
export class _ColorItem {
    @property()
    public key: string = "";

    @property(cc.Color)
    public value: cc.Color = cc.color();
}
