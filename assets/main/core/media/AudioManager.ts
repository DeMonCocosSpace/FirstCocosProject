import ResLoader from "../bd/ResLoader";
import { lodash } from "../NpmExport";

/** 背景音乐基础音量倍数 */
const MUSIC_VOLUME_RATIO = 0.5;
/** 音效基础音量倍数 */
const EFFECT_VOLUME_RATIO = 0.6;

/** 当前音效的播放状态 */
enum IAudioStatus {
    WAIT, // 等待播放
    PLAYING, // 播放中
    FINISH, // 播放完成
    STOP, // 停止播放
}

export default class AudioManager {
    private constructor() {}

    private static _instance = null;

    public static getInstance(): AudioManager {
        if (!this._instance) {
            this._instance = new AudioManager();
        }
        return this._instance;
    }

    public init(): void {}

    private _currentMusic: IAudio = null;

    public get currentMusic(): IAudio {
        if (this.musics.length > 0) {
            return this.musics[this.musics.length - 1];
        } else {
            return null;
        }
    }

    private musicVolume: number = 1;
    private musics: IAudio[] = [];

    /**
     * 播放背景音乐
     * @param resDesc
     * @param loop 是否循环，默认 true
     * @param volume 音量，0-1，默认 系统音量
     * @param onEnd 结束回调
     */
    public playMusic(
        resDesc: IResDescribe,
        loop: boolean = null,
        volume: number = null,
        onEnd: (audio: IAudio) => void = null
    ): void {
        if (loop == null) {
            loop = true;
        }

        if (volume == null) {
            volume = this.musicVolume;
        }

        if (volume < 0 || volume > 1) {
            volume = 1;
        }

        //当前静音
        if (!this.isMusicOpen()) {
            volume = 0;
        }

        //重复播放
        if (
            this.currentMusic != null &&
            this.currentMusic.url == resDesc.resPath &&
            this.currentMusic.id != null
        ) {
            return;
        }

        this.stopMusic();

        const audio: IAudio = {
            url: resDesc.resPath,
            id: null,
            loop: loop,
            volume: volume,
        };
        this.musics.push(audio);

        ResLoader.getInstance().loadResFromBundle(resDesc, (clip: cc.AudioClip) => {
            if (clip) {
                const index = this.musics.indexOf(audio);
                if (index != this.musics.length - 1) {
                    //加载成功前已经开始播放其他bgm
                    return;
                }
                audio.id = cc.audioEngine.play(clip, loop, volume * MUSIC_VOLUME_RATIO);
                cc.audioEngine.setFinishCallback(audio.id, () => {
                    audio.id = null;
                    onEnd?.(audio);
                });
            }
        });
    }

    /**
     * 停止
     */
    public stopMusic() {
        this.musics.forEach((audio: IAudio) => {
            if (audio.id != null) {
                cc.audioEngine.stop(audio.id);
                audio.id = null;
            }
        });
    }

    /**
     * 暂停
     */
    public pauseMusic() {
        if (this.currentMusic != null) {
            cc.audioEngine.pause(this.currentMusic.id);
        }
    }

    /**
     * 恢复
     */
    public resumeMusic() {
        if (this.currentMusic != null) {
            cc.audioEngine.resume(this.currentMusic.id);
        }
    }

    /**
     *  背景音乐是否打开
     * @returns
     */
    public isMusicOpen(): boolean {
        return this.musicVolume > 0;
    }

    /**
     * 设置背景音乐是否开启
     * @param open
     */
    public setMusicOpen(open: boolean): void {
        this.setMusicVolumeValue(open ? 1 : 0);
    }

    public getMusicVolume(): number {
        return this.musicVolume;
    }
    /**
     * 设置背景音乐音量-数值
     * @param volume
     * @returns
     */
    public setMusicVolumeValue(volume: number): void {
        if (volume > 1 || volume < 0) {
            volume = 1;
        }

        if (this.musicVolume == volume) {
            return;
        }

        this.musicVolume = volume;

        //保存数据
        //save

        this.setMusicVolume(volume);
    }

    /**
     * 设置背景音乐音量
     */
    public setMusicVolume(volume: number) {
        if (volume > 1 || volume < 0) {
            volume = 1;
        }

        //if (!this.isMusicOpen()) return;

        if (this.currentMusic != null) {
            cc.audioEngine.setVolume(this.currentMusic.id, MUSIC_VOLUME_RATIO * volume);
        }
    }

    private _currentEffect: IAudio = null;

    public get currentEffect(): IAudio {
        if (this.effects.length > 0) {
            return this.effects[this.effects.length - 1];
        } else {
            return null;
        }
    }

    private effectVolume: number = 1;
    private effects: IAudio[] = [];

    /**
     * 播放音效
     * @param resDesc
     * @param loop 是否循环，默认 false
     * @param volume 音量，0-1，默认 系统音量
     * @param time 从什么时间开始播放，单位秒，0-duration，默认 0
     * @param tag 标签，默认 空
     * @param onPlay 播放回调
     * @param onEnd 结束回调
     * @returns IAudio
     */
    public playEffect(
        resDesc: IResDescribe,
        loop: boolean = null,
        volume: number = null,
        time: number = null,
        tag: string = null,
        onPlay: (audio: IAudio) => void = null,
        onEnd: (audio: IAudio) => void = null
    ): IAudio {
        if (loop == null) {
            loop = false;
        }

        if (volume == null) {
            volume = this.effectVolume;
        }

        if (volume < 0 || volume > 1) {
            volume = 1;
        }

        //当前静音
        if (!this.isEffectOpen()) {
            volume = 0;
        }

        //可播放音效达到最大数量，关掉第一个
        if (this.effects.length >= cc.audioEngine.getMaxAudioInstance() - 1) {
            const audio = this.effects.shift();
            cc.audioEngine.stop(audio.id);
        }

        const audio: IAudio = {
            url: resDesc.resPath,
            id: null,
            loop: loop,
            volume: volume,
            duration: null,
            tag: tag,
            status: IAudioStatus.WAIT,
            stop: null,
        };

        //未加载前就stop，关闭音效
        audio.stop = () => {
            CC_DEBUG && cc.warn(`AudioManager playEffect, stop, uninit, url: ${resDesc.resPath}`);
            audio.status = IAudioStatus.STOP;
            this.stopEffect(resDesc);
        };
        this.effects.push(audio);

        const remove = () => {
            lodash(this.effects).remove((v) => {
                return v == audio;
            });
            audio.id = null;
            audio.stop = () => {};
        };

        ResLoader.getInstance().loadResFromBundle(resDesc, (clip: cc.AudioClip) => {
            if (clip) {
                // 停止播放时则不播放这个音效
                if (audio.status == IAudioStatus.STOP) {
                    remove();
                    return;
                }
                audio.status = IAudioStatus.PLAYING;
                audio.id = cc.audioEngine.play(clip, loop, volume * MUSIC_VOLUME_RATIO);
                audio.duration = cc.audioEngine.getDuration(audio.id);
                //设置播放时刻
                if (time > 0 && time < audio.duration) {
                    cc.audioEngine.setCurrentTime(audio.id, time);
                }
                //播放时stop
                audio.stop = () => {
                    cc.audioEngine.stop(audio.id);
                    audio.status = IAudioStatus.STOP;
                    remove();
                };

                cc.audioEngine.setFinishCallback(audio.id, () => {
                    remove();
                    audio.status = IAudioStatus.FINISH;
                    onEnd?.(audio);
                });

                onPlay?.(audio);
            } else {
                remove();
            }
        });

        return audio;
    }

    public playEffectWithClip(clip: cc.AudioClip, loop: boolean = false, volume: number = null) {
        if (volume == null) {
            volume = this.effectVolume;
        }

        if (volume < 0 || volume > 1) {
            volume = 1;
        }

        if (!this.isEffectOpen()) {
            volume = 0;
        }

        cc.audioEngine.play(clip, loop, volume * EFFECT_VOLUME_RATIO);
    }

    /**
     * 停止
     */
    public stopEffect(resDesc: IResDescribe, all: boolean = true) {
        const lo = lodash(this.effects);
        if (all) {
            const effect = lo.filter((element) => {
                return element.url == resDesc.resPath;
            });
            effect.forEach((element) => {
                cc.audioEngine.stop(element.id);
                element.status = IAudioStatus.STOP;
            });

            lo.remove((v) => {
                return v.url == resDesc.resPath;
            });
        } else {
            const effect = lo.find((element) => {
                return element.url == resDesc.resPath;
            });
            cc.audioEngine.stop(effect.id);
            effect.status = IAudioStatus.STOP;
            lo.remove((v) => {
                return v == effect;
            });
        }
    }

    /**
     * 暂停
     */
    public pauseEffect(resDesc: IResDescribe, all: boolean = true) {
        const lo = lodash(this.effects);
        if (all) {
            const effect = lo.filter((element) => {
                return element.url == resDesc.resPath;
            });
            effect.forEach((element) => {
                cc.audioEngine.pause(element.id);
            });
        } else {
            const effect = lo.find((element) => {
                return element.url == resDesc.resPath;
            });
            cc.audioEngine.pause(effect.id);
        }
    }

    /**
     * 暂停
     */
    public resumeEffect(resDesc: IResDescribe, all: boolean = true) {
        const lo = lodash(this.effects);
        if (all) {
            const effect = lo.filter((element) => {
                return element.url == resDesc.resPath;
            });
            effect.forEach((element) => {
                cc.audioEngine.resume(element.id);
            });
        } else {
            const effect = lo.find((element) => {
                return element.url == resDesc.resPath;
            });
            cc.audioEngine.resume(effect.id);
        }
    }

    /**
     * 设置音效开关
     * @param open
     */
    public setEffectOpen(open: boolean): void {
        this.setEffectsVolumeValue(open ? 1 : 0);
    }

    public getEffectVolume(): number {
        return this.effectVolume;
    }

    /**
     * 设置音效音量-数值
     * @param volume
     * @returns
     */
    public setEffectsVolumeValue(volume: number): void {
        if (volume > 1 || volume < 0) {
            volume = 1;
        }

        if (this.effectVolume == volume) {
            return;
        }

        this.effectVolume = volume;

        //保存数据
        //save

        this.setEffectsVolume(volume);
    }

    /**
     * 设置音效音量
     * @param volume
     */
    public setEffectsVolume(volume: number): void {
        if (volume > 1 || volume < 0) {
            volume = 1;
        }
        if (!this.isEffectOpen()) {
            volume = 0;
        }

        this.effects.forEach((value) => {
            cc.audioEngine.setVolume(value.id, volume * EFFECT_VOLUME_RATIO);
        });
    }

    /**
     * 音效是否打开
     * @returns
     */
    public isEffectOpen(): boolean {
        return this.effectVolume > 0;
    }

    /** -------------------------------- all -------------------------------- */

    public stopAll(): void {
        cc.audioEngine.stopAll();

        this.musics.forEach((value) => {
            value.id = null;
        });

        this.effects = [];
    }

    public pauseAll(): void {
        cc.audioEngine.pauseAll();
    }

    public resumeAll(): void {
        cc.audioEngine.resumeAll();
    }

    public uncacheAll(): void {
        this.stopAll();
        cc.audioEngine.uncacheAll();
    }
}
