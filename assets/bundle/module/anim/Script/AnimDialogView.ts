import PopUpViewBase from "../../../../main/core/ui/popup/PopUpViewBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AnimDialogView extends PopUpViewBase {
    @property(cc.Node)
    bg: cc.Node = null;
    @property(cc.Label)
    content: cc.Label = null;

    private anim: cc.Animation = null;

    public init(name: string): void {
        this.content.string = name;
    }

    onLoad() {
        this.anim = this.bg.getComponent(cc.Animation);
    }

    protected onShow(): Promise<void> {
        return new Promise<void>((resolve) => {
            this.anim.play("ScaleToShow");
            //on注册可以解决子节点的帧事件函数无法在父节点被找到的问题
            //相对来说又不够灵活
            this.anim.once(
                cc.Animation.EventType.FINISHED,
                (type: string, state: cc.AnimationState) => {
                    cc.log("AnimDialogView " + type + "=" + state.name);
                    if (state.name == "ScaleToShow") {
                        resolve();
                    }
                },
                this
            );
        });
    }

    protected onHide(): Promise<void> {
        return new Promise<void>((resolve) => {
            this.anim.play("ScaleToHide");
            //on注册可以解决子节点的帧事件函数无法在父节点被找到的问题
            //相对来说又不够灵活
            this.anim.once(
                cc.Animation.EventType.FINISHED,
                (type: string, state: cc.AnimationState) => {
                    cc.log("AnimDialogView " + type + "=" + state.name);
                    if (state.name == "ScaleToHide") {
                        resolve();
                    }
                },
                this
            );
        });
    }

    agree() {
        cc.log("同意");
        this.close();
    }
    disAgree() {
        cc.log("不同意");
        this.close();
    }
}
