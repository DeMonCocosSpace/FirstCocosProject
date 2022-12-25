// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    load: cc.Node = null
    @property({
        type: cc.Integer,
        slide: true,
        min: 0,
        max: 590,
        step: 1,
    })
    maxPro: number = 0
    @property(cc.Integer)
    loadSpeed: number = 0


    private setWidth = 0

    onLoad() {
        this.load.width = 0;
    }

    start() {

    }

    setProgress(pro: number) {
        if (pro > 1 || pro < 0) { return; }
        this.setWidth = this.maxPro * pro;
    }

    update(dt) {

        if (this.load.width < this.setWidth) {
            this.load.width += dt * this.loadSpeed;
        }

    }
}
