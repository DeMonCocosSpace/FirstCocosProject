const { ccclass, property } = cc._decorator;

export interface BtnData {
    label: string; //按钮要显示的文字，必须
    data?: any;
    callback?: (data: any) => void; //点击回调
}

@ccclass
export default class BtnView extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;

    private data: BtnData;
    init(data: BtnData) {
        this.data = data;
        this.label.string = data.label;
    }

    onClick() {
        this.data?.callback?.(this.data.data);
    }
}
