import CommonSkin from "../../../bundle/common/Script/conf/CommonSkin";
import ResLoader from "../bd/ResLoader";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("core/ui/AutoChangeBg")
export default class AutoChangeBg extends cc.Component {
    onLoad() {
        const bg = this.node.getChildByName("bg").getComponent(cc.Sprite);

        if (bg) {
            bg.spriteFrame = ResLoader.getInstance().getSpriteFrame(CommonSkin.Priority.bgSkin);
        }
    }
}
