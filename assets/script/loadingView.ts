// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    loading: cc.Prefab = null;

    @property(cc.Node)
    bg: cc.Node = null;
    @property(cc.ProgressBar)
    progressBar = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var loadingNode = cc.instantiate(this.loading);
        loadingNode.y = -200;
        this.bg.addChild(loadingNode);

        var c = loadingNode.getComponent('loading');
        c.setProgress(1);

        this.progressBar.progress = 0
    }

    start() {

    }

    update(dt) {

        if (this.progressBar.progress < 1) {
            this.progressBar.progress += dt / 10;
        }
    }
}
