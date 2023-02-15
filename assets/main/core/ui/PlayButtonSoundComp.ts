import ResLoader from "../bd/ResLoader";
import AudioManager from "../media/AudioManager";

const { ccclass, executeInEditMode, menu, property } = cc._decorator;

@ccclass
@executeInEditMode
@menu("core/media/PlayButtonSoundComp")
export default class PlayButtonSoundComp extends cc.Component {
    @property({
        type: cc.AudioClip,
        tooltip: "播放的音效clip",
        visible() {
            if (!this.isPlay) {
                this.soundClip = null;
            }
            return this.isPlay;
        },
    })
    soundClip: cc.AudioClip = null;

    @property({ tooltip: "是否要播放音效" })
    isPlay: boolean = false;

    private soundPath: string = "";
    private resBundleName: string = "";

    start() {
        this.init();
    }

    private init() {
        if (!this.isPlay) {
            return;
        }

        if (this.soundClip) {
            this.node.on(
                cc.Node.EventType.TOUCH_END,
                () => {
                    AudioManager.getInstance().playEffectWithClip(this.soundClip);
                },
                this
            );
        } else if (this.resBundleName.trim() != "" && this.soundPath.trim() != "") {
            ResLoader.getInstance().loadResFromBundle(
                { bundleName: this.resBundleName, resPath: this.soundPath, type: cc.AudioClip },
                (res: cc.AudioClip) => {
                    if (res) {
                        this.node.on(
                            cc.Node.EventType.TOUCH_END,
                            () => {
                                AudioManager.getInstance().playEffectWithClip(res);
                            },
                            this
                        );
                    }
                }
            );
        }
    }

    public setSoundPath(soundPath: string) {
        this.soundPath = soundPath;
    }

    public setResBundleName(resBundleName: string) {
        this.resBundleName = resBundleName;
    }

    public setIsPlay(isPlay: boolean) {
        this.isPlay = isPlay;
    }
}
