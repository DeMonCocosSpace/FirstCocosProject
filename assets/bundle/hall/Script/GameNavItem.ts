import { ResLoader } from "../../../main/core/bd/ResLoader";
import Listener from "../../../main/core/event/Listener";
import EnumController from "../../../main/core/ui/EnumController";
import HallSkin from "./conf/HallSkin";
import HallListenEvent from "./event/HallListenEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameNavItem extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Sprite)
    bg: cc.Sprite = null;

    private _index: number;

    public get index(): number {
        return this._index;
    }

    public set index(v: number) {
        this._index = v;
    }

    public game_ids: number[];

    public init(index: number, data: any) {
        this._index = index;
        this.game_ids = data.game_ids;
        this.label.string = data.name;

        const ctrl = this.getComponentInChildren(EnumController);
        ctrl?.show4Name(`${index}`);
    }

    onLoad() {}

    public setSelectd(): void {
        const ctrl = this.getComponent(EnumController);
        if (ctrl) {
            ctrl.show4Name("select");
        } else {
            if (HallSkin.Priority.hallNavSelectdBg) {
                this.bg.spriteFrame = ResLoader.getInstance().getSpriteFrame(
                    HallSkin.Priority.hallNavSelectdBg
                );
            } else {
                this.bg.spriteFrame = null;
            }
        }
    }

    public setNormal(): void {
        const ctrl = this.getComponent(EnumController);
        if (ctrl) {
            ctrl.show4Name("unselect");
        } else {
            if (HallSkin.Priority.hallNavNormalBg) {
                this.bg.spriteFrame = ResLoader.getInstance().getSpriteFrame(
                    HallSkin.Priority.hallNavNormalBg
                );
            } else {
                this.bg.spriteFrame = null;
            }
        }
    }

    public onClick() {
        Listener.send(
            HallListenEvent.LISTEN_UI_GAME_VIEW_SHOW,
            this.game_ids as number[],
            this.index
        );
    }
}
