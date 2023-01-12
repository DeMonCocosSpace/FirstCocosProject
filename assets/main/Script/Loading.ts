// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Loading extends cc.Component {
    @property(cc.ProgressBar)
    progress: cc.ProgressBar = null;

    onLoad() {
        this.progress.progress = 0;
        //加载Login资源
    }

    update(dt) {
        if (this.progress.progress < 1) {
            this.progress.progress += dt / 5;
        }
    }
}
