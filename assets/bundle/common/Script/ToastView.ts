import { lodash } from "../../../main/core/NpmExport";
import { Utils } from "../../../main/core/utils/Utils";
import ToastItem from "./ToastItem";

const { ccclass, property } = cc._decorator;

const ACTION_TIME = 0.24;
@ccclass
export default class ToastView extends cc.Component {
    @property(cc.Node)
    content: cc.Node = null;
    @property(cc.Prefab)
    toastItem: cc.Prefab = null;

    private toastList: cc.Node[] = [];

    public addToast(msg: string): void {
        //关掉上个toast
        // if (!lodash.isEmpty(this.toastList)) {
        //     this.deleteToast(lodash.last(this.toastList));
        // }

        const toastItem = cc.instantiate(this.toastItem);
        toastItem.position = cc.v3(0, 0, 0);
        toastItem.opacity = 0;
        this.node.addChild(toastItem);

        toastItem.stopAllActions();
        toastItem.targetOff(this);
        toastItem.on(cc.Node.EventType.SIZE_CHANGED, this.onItemSizeChange, this);
        toastItem.getComponent(ToastItem).show(msg);
        this.toastList.unshift(toastItem);

        cc.tween<cc.Node>(toastItem)
            .to(ACTION_TIME, { opacity: 255 })
            .delay(1.5)
            .to(ACTION_TIME, { opacity: 0 })
            .call(() => {
                this.deleteToast(toastItem);
            })
            .start();
    }

    private onItemSizeChange() {
        let starPos = cc.v3(0, 0, 0);
        let allHight = 0;
        this.toastList.forEach((element) => {
            if (element != null && cc.isValid(element)) {
                const toPos = starPos.add(cc.v3(0, allHight + element.height / 2, 0));
                allHight = allHight + element.height;
                cc.tween<cc.Node>(element).to(ACTION_TIME, { position: toPos }).start();
            }
        });
    }

    private deleteToast(item: cc.Node) {
        lodash(this.toastList).remove((element) => {
            return item.uuid == element.uuid;
        });
        item.destroy();
    }
}
