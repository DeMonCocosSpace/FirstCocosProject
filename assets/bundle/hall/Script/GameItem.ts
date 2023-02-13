import ResLoader from "../../../main/core/bd/ResLoader";
import { GameType } from "../../../main/core/conf/GameType";
import RandomUtils from "../../../main/core/utils/RandomUtils";
import HallSkin from "./conf/HallSkin";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameItem extends cc.Component {
    @property(cc.Sprite)
    pic: cc.Sprite = null;

    @property({ type: cc.Sprite, tooltip: "游戏tag" })
    tag: cc.Sprite = null;

    @property(cc.Node)
    hand: cc.Node = null;

    onLoad() {}

    private gameId: GameType;

    public initGame(gameId: GameType, needHand: boolean) {
        this.gameId = gameId;

        this.pic.spriteFrame = ResLoader.getInstance().getSpriteFrame(
            HallSkin.Priority.gameEntranceInfo[gameId] || HallSkin.Priority.gameEntranceInfo.default
        );

        /**
         * 模拟tag
         */
        const type = RandomUtils.randomInt(0, 4);
        if (type == 4) {
            this.tag.spriteFrame = null;
        } else {
            this.tag.spriteFrame = ResLoader.getInstance().getSpriteFrame(
                HallSkin.Priority.gameTag[type]
            );
        }
        this.hand.active = needHand;
    }

    onGameClick() {
        cc.log("GameItem gameId=" + this.gameId);
    }
}
