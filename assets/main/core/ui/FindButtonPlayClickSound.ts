import { PlayButtonSoundUtils } from "../utils/PlayButtonSoundUtils";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("core/media/FindButtonPlayClickSound")
export default class FindButtonPlayClickSound extends cc.Component {
    onLoad() {
        PlayButtonSoundUtils.getInstance().buttonPlaySoundHandle(this.node);
    }
}
