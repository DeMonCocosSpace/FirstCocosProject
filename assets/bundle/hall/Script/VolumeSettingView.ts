import { log } from "console";
import AudioManager from "../../../main/core/media/AudioManager";
import BasePrefabView from "../../../main/core/ui/BasePrefabView";
import { Utils } from "../../../main/core/utils/Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class VolumeSettingView extends BasePrefabView {
    @property(cc.Toggle)
    allToggle: cc.Toggle = null;
    @property(cc.Toggle)
    musicToggle: cc.Toggle = null;
    @property(cc.Toggle)
    effectToggle: cc.Toggle = null;

    @property(cc.Slider)
    musicSlider: cc.Slider = null;
    @property(cc.Slider)
    effectSlider: cc.Slider = null;

    onLoad() {
        this.show();

        this.allToggle.isChecked =
            AudioManager.getInstance().isMusicOpen() || AudioManager.getInstance().isEffectOpen();
        this.musicToggle.isChecked = AudioManager.getInstance().isMusicOpen();
        this.musicSlider.progress = AudioManager.getInstance().getMusicVolume();

        this.effectToggle.isChecked = AudioManager.getInstance().isEffectOpen();
        this.effectSlider.progress = AudioManager.getInstance().getEffectVolume();
    }

    start() {}

    openAll() {
        const isChecked = this.allToggle.isChecked;
        cc.log("VolumeSettingView openAll=" + isChecked);
        AudioManager.getInstance().setMusicOpen(isChecked);
        AudioManager.getInstance().setEffectOpen(isChecked);

        this.musicSlider.progress = isChecked ? 1 : 0;
        this.musicToggle.isChecked = isChecked;
        this.effectSlider.progress = isChecked ? 1 : 0;
        this.effectToggle.isChecked = isChecked;
    }

    openMusic() {
        const isChecked = this.musicToggle.isChecked;
        cc.log("VolumeSettingView openMusic=" + isChecked);
        AudioManager.getInstance().setMusicOpen(isChecked);
        this.musicSlider.progress = isChecked ? 1 : 0;
    }

    onMusicChange() {
        const progress = this.musicSlider.progress;
        cc.log("VolumeSettingView onMusicChange=" + progress);
        this.musicToggle.isChecked = progress > 0 ? true : false;
        AudioManager.getInstance().setMusicVolumeValue(progress);
    }

    openEffect() {
        const isChecked = this.effectToggle.isChecked;
        cc.log("VolumeSettingView openEffect=" + isChecked);
        AudioManager.getInstance().setEffectOpen(isChecked);
        this.effectSlider.progress = isChecked ? 1 : 0;
    }

    onEffectChange() {
        const progress = this.effectSlider.progress;
        cc.log("VolumeSettingView onEffectChange=" + progress);
        this.effectToggle.isChecked = progress > 0 ? true : false;
        AudioManager.getInstance().setEffectsVolumeValue(progress);
    }
}
