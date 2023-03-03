import BundleCenter from "../../../../main/core/bd/BundleCenter";

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

    onClick(ss: string) {
        BundleCenter.getInstance().launchSence(this.value.bundle);
    }
}
