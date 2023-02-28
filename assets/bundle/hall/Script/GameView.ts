import { ResLoader } from "../../../main/core/bd/ResLoader";
import GameConfig from "../../../main/core/conf/GameConfig";
import { GameType } from "../../../main/core/conf/GameType";
import Listener from "../../../main/core/event/Listener";
import CacheUtils from "../../../main/core/utils/CacheUtils";
import { Utils } from "../../../main/core/utils/Utils";
import HallSkin from "./conf/HallSkin";
import AnimSkin from "./conf/HallSkin";
import HallListenEvent from "./event/HallListenEvent";
import GameItem from "./GameItem";
import GameNavItem from "./GameNavItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameView extends cc.Component {
    @property(cc.Node)
    btnLeft: cc.Node = null;
    @property(cc.Node)
    btnRight: cc.Node = null;
    @property(cc.Node)
    gameContent: cc.Node = null;
    @property(cc.ScrollView)
    gameScrollView: cc.ScrollView = null;
    @property(cc.Node)
    navContent: cc.Node = null;

    private _isOverLeft = false;
    private _isOverRight = false;
    private _touchScrollX: number;

    onLoad() {
        this.btnLeft.on(cc.Node.EventType.TOUCH_END, this.onLeft, this);
        this.btnRight.on(cc.Node.EventType.TOUCH_END, this.onRight, this);
        this.gameScrollView.node.on("bounce-left", this.onScrollToLeft, this);
        this.gameScrollView.node.on("bounce-right", this.onScrollToRight, this);
        this.gameScrollView.node.on("scroll-began", this.onScrollBegan, this);
        this.gameScrollView.node.on("scrolling", this.onScrolling, this);
        this.gameScrollView.node.on("scroll-to-left", this.onScrollToLeftEnd, this);
        this.gameScrollView.node.on("scroll-to-right", this.onScrollToRightEnd, this);
        this.showNavView();
    }

    private onLeft() {
        this.gameScrollView.scrollToLeft(0.3);
        this.onScrollToLeft();
    }

    private onRight() {
        this.gameScrollView.scrollToRight(0.3);
        this.onScrollToRight();
    }

    private onScrollToLeft() {
        this.btnLeft.active = false;
        this.btnRight.active = true;
        this._isOverLeft = true;
        this._isOverRight = false;
    }
    private onScrollToRight() {
        this.btnLeft.active = true;
        this.btnRight.active = false;
        this._isOverRight = true;
        this._isOverLeft = false;
    }

    private onScrollToLeftEnd() {
        this._isOverLeft = true;
        this._isOverRight = false;
    }

    private onScrollToRightEnd() {
        this._isOverLeft = false;
        this._isOverRight = true;
    }

    private onScrollBegan() {
        this._isOverLeft = false;
        this._isOverRight = false;
        this._touchScrollX = this.gameContent.x;
    }

    private onScrolling() {
        if (!this.checkValidScroll()) return;
        this.btnLeft.active = !this._isOverLeft;
        this.btnRight.active = !this._isOverRight;
        this._touchScrollX = this.gameContent.x;
    }

    private checkValidScroll() {
        const DIS = 5;
        let diff = this.gameContent.x - this._touchScrollX;
        let enoughDis = Math.abs(diff) > DIS;
        let enoughWidth = this.gameScrollView.node.width < this.gameContent.width;
        return enoughDis && enoughWidth;
    }

    start() {
        this.btnLeft.active = false;
        this.btnRight.active = false;

        cc.tween(this.btnLeft)
            .repeatForever(
                cc
                    .tween()
                    .delay(3)
                    .repeat(3, cc.tween().by(0.15, { x: -30 }).by(0.15, { x: 30 }))
            )
            .start();

        cc.tween(this.btnRight)
            .repeatForever(
                cc
                    .tween()
                    .delay(3)
                    .repeat(3, cc.tween().by(0.15, { x: 30 }).by(0.15, { x: -30 }))
            )
            .start();
    }

    /**
     * 显示nav导航栏
     */
    private showNavView() {
        const navItemPf: cc.Prefab = ResLoader.getInstance().getPrefab(
            AnimSkin.Priority.GameNavItem
        );

        this.navContent.removeAllChildren();

        let navItemIndex: number = CacheUtils.getInstance().getNavItemIndex();

        GameConfig.forEach((value, index, _) => {
            const navItem = cc.instantiate(navItemPf);
            this.navContent.addChild(navItem);
            const ctrl = navItem.getComponent(GameNavItem);
            ctrl.init(index, value);

            index == navItemIndex ? ctrl.setSelectd() : ctrl.setNormal();
        });

        let game_ids: number[] = GameConfig[navItemIndex].game_ids;
        this.showGameView(game_ids, navItemIndex);
    }

    /**
     * 显示游戏
     * @param game_ids
     * @param index
     */
    private showGameView(game_ids: number[], index: number) {
        CacheUtils.getInstance().setNavItemIndex(index);

        this.navContent.children.forEach((node: cc.Node) => {
            const ctrl = node.getComponent(GameNavItem);
            ctrl.index == index ? ctrl.setSelectd() : ctrl.setNormal();
        });

        this.gameContent.removeAllChildren();

        const pf = ResLoader.getInstance().getPrefab(HallSkin.Priority.GameItem);
        /**
         * 模拟引导点击动画
         */
        const needHand = Utils.randomInt(game_ids.length - 1);
        cc.log("GameView game_ids.length=%s,needHand=%s", game_ids.length, needHand);
        game_ids.forEach((value: GameType, index: number) => {
            const node = cc.instantiate(pf);
            this.gameContent.addChild(node);

            const ctrl = node.getComponent(GameItem);
            ctrl.initGame(value, index == needHand);
        });

        this.initGameScrollView();
    }

    private initGameScrollView() {
        this.gameScrollView.scrollToLeft(0.2);
        this.scheduleOnce(() => {
            //判断是否可以和滚动
            if (this.gameScrollView.node.width >= this.gameContent.width) {
                this.btnLeft.active = false;
                this.btnRight.active = false;
            } else {
                this.btnLeft.active = false;
                this.btnRight.active = true;
            }
        }, 0.1);
    }

    protected onEnable(): void {
        Listener.listen(HallListenEvent.LISTEN_UI_GAME_VIEW_SHOW, this.showGameView, this);
    }

    protected onDisable(): void {
        Listener.targetOff(this);
    }
}
