const { ccclass, property, executeInEditMode, menu } = cc._decorator;

export enum MixType {
    None,
    NodeColor,
    Text,
    SpriteFrame,
    OutLineColor,
    SkeletonData,
    Size,
    SkeletionAnimation,
    Layout,
    NodeActive,
    MultLangLabel,
    Position,
    ObjectLabel,
    Label,
    LabelShadow,
    Node,
}

@ccclass("__MixItemPropertyItemNode")
export class __MixItemPropertyItemNode {
    @property()
    modifyColor: boolean = false;
    @property({
        visible() {
            return this.modifyColor;
        },
    })
    color: cc.Color = cc.color();

    @property()
    modifyAnchor: boolean = false;
    @property({
        visible() {
            return this.modifyAnchor;
        },
    })
    anchor: cc.Vec2 = cc.v2(0.5, 0.5);

    @property()
    modifyPosition: boolean = false;
    @property({
        visible() {
            return this.modifyPosition;
        },
    })
    position: cc.Vec2 = cc.v2();

    @property()
    modifyX: boolean = false;
    @property({
        visible() {
            return this.modifyX;
        },
    })
    x: number = 0;
    @property()
    modifyY: boolean = false;
    @property({
        visible() {
            return this.modifyY;
        },
    })
    y: number = 0;

    @property()
    modifyAngle: boolean = false;
    @property({
        visible() {
            return this.modifyAngle;
        },
    })
    angle: number = 0;

    @property()
    modifyScaleX: boolean = false;
    @property({
        visible() {
            return this.modifyScaleX;
        },
    })
    scaleX: number = 1;
    @property()
    modifyScaleY: boolean = false;
    @property({
        visible() {
            return this.modifyScaleY;
        },
    })
    scaleY: number = 1;
}

@ccclass("__MixItemPropertyItemLabelShadow")
export class __MixItemPropertyItemLabelShadow {
    @property(cc.Color)
    color: cc.Color = cc.color();

    @property(cc.Vec2)
    offset: cc.Vec2 = cc.v2();

    @property()
    blur: number = 0;
}

@ccclass("__MixItemPropertyItemLabel")
export class __MixItemPropertyItemLabel {
    @property()
    fontSize: number = 0;

    @property()
    modifyString: boolean = true;
    @property({
        visible() {
            return this.modifyString;
        },
    })
    string: string = "";
}

@ccclass("__MixItemPropertyItemObjectLabel")
export class __MixItemPropertyItemObjectLabel {
    @property()
    text: string = "";
}

@ccclass("__MixItemPropertyItemMultLangLabel")
export class __MixItemPropertyItemMultLangLabel {
    @property()
    subKey: string = "";
}

@ccclass("__MixItemPropertyItemNodePosition")
export class __MixItemPropertyItemNodePosition {
    @property(cc.Vec3)
    public position: cc.Vec3 = cc.v3();
}

@ccclass("__MixItemPropertyItemNodeActive")
export class __MixItemPropertyItemNodeActive {
    @property()
    public active: boolean = false;
    @property(cc.Node)
    public target: cc.Node = null;
}

@ccclass("__MixItemPropertyNodeActive")
export class __MixItemPropertyNodeActive {
    @property(__MixItemPropertyItemNodeActive)
    nodes: __MixItemPropertyItemNodeActive[] = [new __MixItemPropertyItemNodeActive()];
}

@ccclass("__MixItemPropertySkeletionAnimation")
export class __MixItemPropertySkeletionAnimation {
    @property()
    animationName: string = "";
    @property()
    loop: boolean = false;
    @property()
    delayTime: number = 0;
}

@ccclass("__MixItemPropertyLayout")
export class __MixItemPropertyLayout {
    @property({ type: cc.Enum(cc.Layout.Type) })
    type: cc.Layout.Type = cc.Layout.Type.NONE;
    @property({ type: cc.Enum(cc.Layout.ResizeMode) })
    resizeMode: cc.Layout.ResizeMode = cc.Layout.ResizeMode.NONE;
    @property({
        visible: function () {
            return this.type !== cc.Layout.Type.VERTICAL;
        },
    })
    paddingLeft: number = 0;
    /** !#en The right padding of layout, it only effect the layout in one direction.
    !#zh 容器内右边距，只会在一个布局方向上生效。 */
    @property({
        visible: function () {
            return this.type !== cc.Layout.Type.VERTICAL;
        },
    })
    paddingRight: number = 0;
    /** !#en The top padding of layout, it only effect the layout in one direction.
    !#zh 容器内上边距，只会在一个布局方向上生效。 */
    @property({
        visible: function () {
            return this.type !== cc.Layout.Type.HORIZONTAL;
        },
    })
    paddingTop: number = 0;
    /** !#en The bottom padding of layout, it only effect the layout in one direction.
    !#zh 容器内下边距，只会在一个布局方向上生效。 */
    @property({
        visible: function () {
            return this.type !== cc.Layout.Type.HORIZONTAL;
        },
    })
    paddingBottom: number = 0;
    /** !#en The distance in x-axis between each element in layout.
    !#zh 子节点之间的水平间距。 */
    @property({
        visible: function () {
            return this.type !== cc.Layout.Type.VERTICAL;
        },
    })
    spacingX: number = 0;
    /** !#en The distance in y-axis between each element in layout.
    !#zh 子节点之间的垂直间距。 */
    @property({
        visible: function () {
            return this.type !== cc.Layout.Type.HORIZONTAL;
        },
    })
    spacingY: number = 0;

    @property({
        type: cc.Enum(cc.Layout.VerticalDirection),
        visible: function () {
            return this.type == cc.Layout.Type.VERTICAL;
        },
    })
    verticalDirection: cc.Layout.VerticalDirection = cc.Layout.VerticalDirection.TOP_TO_BOTTOM;

    @property({
        type: cc.Enum(cc.Layout.HorizontalDirection),
        visible: function () {
            return this.type == cc.Layout.Type.HORIZONTAL;
        },
    })
    horizontalDirection: cc.Layout.HorizontalDirection =
        cc.Layout.HorizontalDirection.LEFT_TO_RIGHT;
}

@ccclass("_MixItemProperty")
export class _MixItemProperty {
    @property({ type: cc.Enum(MixType) })
    private _type: MixType = MixType.None;

    @property({ type: cc.Enum(MixType) })
    public get type() {
        return this._type;
    }
    public set type(value: MixType) {
        this._type = value;
    }

    @property({
        visible: function () {
            return this.type === MixType.NodeColor;
        },
    })
    private nodeColor: cc.Color = cc.color();

    @property({
        visible: function () {
            return this.type === MixType.Text;
        },
    })
    private text: string = "";

    @property({
        type: cc.SpriteFrame,
        visible: function () {
            return this.type === MixType.SpriteFrame;
        },
    })
    private spriteFrame: cc.SpriteFrame = null;

    @property({
        visible: function () {
            return this.type === MixType.OutLineColor;
        },
    })
    private outLineColor: cc.Color = cc.color();

    @property({
        type: sp.SkeletonData,
        visible: function () {
            return this.type === MixType.SkeletonData;
        },
    })
    private skeletonData: sp.SkeletonData = null;

    @property({
        visible: function () {
            return this.type === MixType.Size;
        },
    })
    private size: cc.Size = cc.size(0, 0);

    @property({
        type: __MixItemPropertySkeletionAnimation,
        visible: function () {
            return this.type === MixType.SkeletionAnimation;
        },
    })
    private skeletionAnimation: __MixItemPropertySkeletionAnimation =
        new __MixItemPropertySkeletionAnimation();

    @property({
        type: __MixItemPropertyLayout,
        visible: function () {
            return this.type === MixType.Layout;
        },
    })
    private layout: __MixItemPropertyLayout = new __MixItemPropertyLayout();

    @property({
        type: __MixItemPropertyNodeActive,
        visible: function () {
            return this.type === MixType.NodeActive;
        },
    })
    private nodeActive: __MixItemPropertyNodeActive = new __MixItemPropertyNodeActive();

    @property({
        type: __MixItemPropertyItemMultLangLabel,
        visible: function () {
            return this.type === MixType.MultLangLabel;
        },
    })
    private multLangLabel: __MixItemPropertyItemMultLangLabel =
        new __MixItemPropertyItemMultLangLabel();

    @property({
        type: __MixItemPropertyItemNodePosition,
        visible: function () {
            return this.type === MixType.Position;
        },
    })
    private position: __MixItemPropertyItemNodePosition = new __MixItemPropertyItemNodePosition();

    @property({
        type: __MixItemPropertyItemObjectLabel,
        visible: function () {
            return this.type === MixType.ObjectLabel;
        },
    })
    private objectLabel: __MixItemPropertyItemObjectLabel = new __MixItemPropertyItemObjectLabel();

    @property({
        type: __MixItemPropertyItemLabel,
        visible: function () {
            return this.type === MixType.Label;
        },
    })
    private label: __MixItemPropertyItemLabel = new __MixItemPropertyItemLabel();

    @property({
        type: __MixItemPropertyItemLabelShadow,
        visible: function () {
            return this.type === MixType.LabelShadow;
        },
    })
    private labelShadow: __MixItemPropertyItemLabelShadow = new __MixItemPropertyItemLabelShadow();

    @property({
        type: __MixItemPropertyItemNode,
        visible: function () {
            return this.type === MixType.Node;
        },
    })
    private node: __MixItemPropertyItemNode = new __MixItemPropertyItemNode();

    public get value() {
        switch (this.type) {
            case MixType.NodeColor: {
                return this.nodeColor;
            }
            case MixType.Text: {
                return this.text;
            }
            case MixType.SpriteFrame: {
                return this.spriteFrame;
            }
            case MixType.OutLineColor: {
                return this.outLineColor;
            }
            case MixType.SkeletonData: {
                return this.skeletonData;
            }
            case MixType.Size: {
                return this.size;
            }
            case MixType.SkeletionAnimation: {
                return this.skeletionAnimation;
            }
            case MixType.Layout: {
                return this.layout;
            }
            case MixType.NodeActive: {
                return this.nodeActive;
            }
            case MixType.MultLangLabel: {
                return this.multLangLabel;
            }
            case MixType.Position: {
                return this.position;
            }
            case MixType.ObjectLabel: {
                return this.objectLabel;
            }
            case MixType.Label: {
                return this.label;
            }
            case MixType.LabelShadow: {
                return this.labelShadow;
            }
            case MixType.Node: {
                return this.node;
            }
            default: {
                return undefined;
            }
        }
    }
}

@ccclass("_MixItem")
export class _MixItem {
    @property()
    public key: string = "";

    @property(_MixItemProperty)
    propertys: _MixItemProperty[] = [new _MixItemProperty()];

    public get values() {
        return this.propertys;
    }
}
