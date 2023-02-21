const { ccclass, property } = cc._decorator;

const TOAST_MAX_WIDTH = 960;

@ccclass
export default class ToastItem extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;

    public show(msg: string) {
        this.label.string = msg;
        this.label["_forceUpdateRenderData"](true);
        const top = 10,
            botttom = 20;
        this.scheduleOnce(() => {
            const layout = this.node.getComponent(cc.Layout);
            if (this.label.node.width < TOAST_MAX_WIDTH) {
                this.label.overflow = cc.Label.Overflow.NONE;
                layout.type = cc.Layout.Type.HORIZONTAL;
                layout.node.height = this.label.node.height + top + botttom;
            } else {
                this.label.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
                this.label.node.width = TOAST_MAX_WIDTH;
                layout.updateLayout();
                layout.type = cc.Layout.Type.VERTICAL;
                layout.paddingTop = top;
                layout.paddingBottom = botttom;
            }
        });
    }
}
