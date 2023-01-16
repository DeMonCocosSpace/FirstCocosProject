// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BundleCenter from "../../../main/core/bd/BundleCenter";
import { BundleName } from "../../../main/core/conf/BundleName";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlazaBtnView extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;

    protected onLoad(): void {}

    private value: any = null;

    init(value: any) {
        this.value = value;
        this.label.string = value.title;
    }

    onClick() {
        //BundleCenter.getInstance().launchSence(this.bundleName);
    }
}
