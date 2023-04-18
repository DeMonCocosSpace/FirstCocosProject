import { CocosUtils } from "../../../../main/core/utils/CocosUtils";
import BasePrefabView from "../../../../main/core/ui/BasePrefabView";
import { ResLoader } from "../../../../main/core/bd/ResLoader";
import HallSkin from "./conf/HallSkin";
import AudioManager from "../../../../main/core/media/AudioManager";
import { UI } from "../../../common/Script/commpent/UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HallView extends BasePrefabView {
    @property(cc.Sprite)
    bg: cc.Sprite = null;

    @property(cc.Node)
    vip: cc.Node = null;

    onLoad() {
        UI.setBg(this.bg);

        cc.tween(this.vip)
            .repeatForever(
                cc
                    .tween()
                    .delay(3)
                    .to(1, { scale: 1 })
                    .call(() => {
                        AudioManager.getInstance().playEffect(HallSkin.UnPriority.newbie_bonus);
                    })
                    .to(1, { scale: 0.8 })
            )
            .start();
    }

    goback(): void {
        CocosUtils.getInstance().goPlaza();
    }

    settingVolume() {
        ResLoader.getInstance().loadPrefab(
            HallSkin.UnPriority.VolumeSettingView,
            (pf: cc.Prefab) => {
                const node = cc.instantiate(pf);
                this.node.addChild(node);
            }
        );
    }

    onTask() {
        AudioManager.getInstance().playEffect(HallSkin.UnPriority.online_bonus);
    }

    // update (dt) {}
}
