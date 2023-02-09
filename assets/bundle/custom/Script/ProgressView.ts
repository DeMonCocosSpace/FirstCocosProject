const { ccclass, property } = cc._decorator;

@ccclass
export default class ProgressView extends cc.Component {
    @property(cc.Node)
    load: cc.Node = null;
    @property({
        type: cc.Integer,
        slide: true,
        min: 0,
        max: 600,
        step: 1,
    })
    maxPro: number = 0;

    private setWidth = 0;

    public curPro = 0;
    public isOver = false;

    finishCallback: () => void;

    onLoad() {
        this.load.width = 0;
        this.isOver = false;
        this.curPro = 0;
    }

    start() {}

    isMax(): boolean {
        return this.curPro >= 100;
    }

    //@param pro 0~100
    setProgress(pro: number) {
        if (pro > 100) {
            this.curPro = 100;
        } else if (pro < 0) {
            this.curPro = 0;
        } else {
            this.curPro = pro;
        }
        let width = (this.maxPro * this.curPro) / 100;
        if (width > this.setWidth) {
            this.isOver = false;
            this.setWidth = width;
        }
    }

    update(dt) {
        if (!this.isOver) {
            if (this.load.width < this.setWidth) {
                this.load.width += dt * 100;
            }

            if (this.load.width >= this.maxPro) {
                this.isOver = true;
                this.finishCallback?.();
            }
        }
    }
}
