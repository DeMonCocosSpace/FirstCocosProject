import { lodash } from "../NpmExport";
import SkeletonHelper from "../SkeletonHelper";
import BaseEnumComp from "./BaseEnumComp";
import {
    MixType,
    _MixItem,
    _MixItemProperty,
    __MixItemPropertyItemLabel,
    __MixItemPropertyItemLabelShadow,
    __MixItemPropertyItemMultLangLabel,
    __MixItemPropertyItemNode,
    __MixItemPropertyItemNodePosition,
    __MixItemPropertyItemObjectLabel,
    __MixItemPropertyLayout,
    __MixItemPropertyNodeActive,
    __MixItemPropertySkeletionAnimation,
} from "./item/_MixItem";
import ObjectLabel from "./ObjectLabel";

const { ccclass, property, executeInEditMode, menu } = cc._decorator;

@ccclass
@executeInEditMode
@menu("core/controller/EnumMix")
export default class EnumMix extends BaseEnumComp {
    @property(_MixItem)
    protected childs: _MixItem[] = [];

    protected onFocusInEditor(): void {
        this.childs.forEach((v, i) => {
            if (v.key === "") {
                v.key = i.toString();
            }
        });
        let enumMap: { [key: string]: number } = {
            "<None>": 0,
        };
        this.getChilds().forEach((v, i) => {
            enumMap[v?.name ?? "<Unknown>"] = i + 1;
        });
        cc.Class["Attr"].setClassAttr(this, "activeIndex", "enumList", cc.Enum["getList"](enumMap));
    }

    public getChilds(): { name: string; values: _MixItemProperty[] }[] {
        return this.childs.map((v) => {
            return {
                name: v.key,
                values: v.values,
            };
        });
    }

    protected updateActive(): void {
        const value = this.activeIndex - 1;
        let values = this.getChilds()?.[value]?.values ?? [];
        values.forEach((v) => {
            if (v.value === undefined) {
                return;
            }
            switch (v.type) {
                case MixType.NodeColor: {
                    this.node.color = v.value as cc.Color;
                    break;
                }
                case MixType.Text: {
                    (this.getComponent(cc.Label) || this.getComponent(cc.RichText)).string =
                        v.value as string;
                    break;
                }
                case MixType.SpriteFrame: {
                    this.getComponent(cc.Sprite).spriteFrame = v.value as cc.SpriteFrame;
                    break;
                }
                case MixType.OutLineColor: {
                    this.getComponent(cc.LabelOutline).color = v.value as cc.Color;
                    break;
                }
                case MixType.Size: {
                    this.node.setContentSize(v.value as cc.Size);
                    break;
                }
                case MixType.SkeletonData: {
                    const value = v.value as sp.SkeletonData;
                    this.getComponent(sp.Skeleton).skeletonData = value;
                    break;
                }
                case MixType.SkeletionAnimation: {
                    const value = v.value as __MixItemPropertySkeletionAnimation;
                    let helper = new SkeletonHelper(this.getComponent(sp.Skeleton));
                    let animation = value.animationName || helper.getAnimationNames()[0];
                    helper.pause(animation);
                    this.scheduleOnce(() => {
                        helper.play(value.animationName || helper.getAnimationNames()[0], {
                            loop: value.loop,
                        });
                    }, value.delayTime);
                    break;
                }
                case MixType.Layout: {
                    const value = v.value as __MixItemPropertyLayout;
                    let layout = this.getComponent(cc.Layout) || this.addComponent(cc.Layout);
                    for (let key in value) {
                        layout[key] = value[key];
                    }
                    layout.updateLayout();
                    break;
                }
                case MixType.NodeActive: {
                    const value = v.value as __MixItemPropertyNodeActive;
                    value.nodes.forEach((item) => {
                        if (item.target) {
                            item.target.active = item.active;
                        }
                    });
                    break;
                }

                case MixType.MultLangLabel: {
                    // const value = v.value as __MixItemPropertyItemMultLangLabel;
                    // let label =
                    //     this.getComponent(MultLangLabelCustom) || this.getComponent(MultLangLabel);
                    // if (!cc.isValid(label)) {
                    //     return;
                    // }
                    // if (value.subKey) {
                    //     label.subLangKey = value.subKey;
                    // }

                    break;
                }

                case MixType.Position: {
                    const value = v.value as __MixItemPropertyItemNodePosition;
                    this.node.position = value.position;

                    break;
                }
                case MixType.ObjectLabel: {
                    const value = v.value as __MixItemPropertyItemObjectLabel;
                    if (this.getComponent(ObjectLabel)) {
                        this.getComponent(ObjectLabel).text = value.text;
                        this.getComponent(ObjectLabel).updateText();
                    }

                    break;
                }
                case MixType.Label: {
                    const value = v.value as __MixItemPropertyItemLabel;
                    if (this.getComponent(cc.Label)) {
                        this.getComponent(cc.Label).fontSize = value.fontSize;
                        value.modifyString && (this.getComponent(cc.Label).string = value.string);
                    }

                    break;
                }

                case MixType.LabelShadow: {
                    const value = v.value as __MixItemPropertyItemLabelShadow;

                    if (this.getComponent(cc.LabelShadow)) {
                        this.getComponent(cc.LabelShadow).color = value.color;
                        this.getComponent(cc.LabelShadow).offset = value.offset;
                        this.getComponent(cc.LabelShadow).blur = value.blur;
                    }

                    break;
                }
                case MixType.Node: {
                    const value = v.value as __MixItemPropertyItemNode;
                    lodash
                        .chain(Object.keys(value))
                        .filter((v) => v.startsWith("modify"))
                        .filter((v) => {
                            return value[v] === true;
                        })
                        .map((v) => {
                            return lodash.lowerFirst(v.replace("modify", ""));
                        })
                        .filter((v) => {
                            return value[v] !== undefined;
                        })
                        .forEach((v) => {
                            switch (v) {
                                case "anchor": {
                                    this.node.setAnchorPoint(value[v]);
                                    break;
                                }
                                default: {
                                    this.node[v] = value[v];
                                }
                            }
                        })
                        .value();

                    break;
                }
            }
        });
    }
    // update (dt) {}
}
