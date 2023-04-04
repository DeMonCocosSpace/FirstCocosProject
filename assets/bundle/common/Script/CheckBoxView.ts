const { ccclass, property } = cc._decorator;

@ccclass
export default class CheckBoxView extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Toggle)
    toggle: cc.Toggle = null;

    public text = "";

    onLoad() {
        this.toggle.uncheck();
    }

    private callback?: (v: string) => void = null;

    public init(text: string, callback?: (v: string) => void) {
        this.text = text;
        this.label.string = text;
        this.callback = callback;
    }

    onToggle(toggle: cc.Toggle) {
        this.callback?.(this.text);
    }

    public setLabelColor(color: cc.Color) {
        this.label.node.color = color;
    }

    public setCheck(isCheck: boolean) {
        isCheck ? this.toggle.check() : this.toggle.uncheck();
    }
}
