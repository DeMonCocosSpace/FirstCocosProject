const { ccclass, property } = cc._decorator;

@ccclass
export default class CheckBoxView extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Toggle)
    toggle: cc.Toggle = null;

    private callback: (v: string) => void = null;

    public init(text: string, callback?: (v: string) => void) {
        this.label.string = text;
        this.callback = callback;
        this.node.on("click", this.click, this);
    }

    private click() {
        this.callback?.(this.label.string);
    }

    public setCheck(isCheck: boolean) {
        isCheck ? this.toggle.check() : this.toggle.uncheck();
    }
}
