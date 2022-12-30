// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadingView extends cc.Component {
    @property(cc.Prefab)
    loadingbar = null;
    @property(cc.Prefab)
    loginView = null;
    @property(cc.Node)
    logo = null;
    @property(cc.Node)
    bg = null;
    @property(cc.Node)
    loginBtn = null;
    @property(cc.Prefab)
    registerView: cc.Prefab = null;

    private registerNode = null;
    private loginViewNode = null;

    // 静态变量模拟js全局变量调用
    static g_loading: LoadingView;

    onLoad() {
        LoadingView.g_loading = this;

        let loadingNode = cc.instantiate(this.loadingbar);
        loadingNode.y = -150;
        this.bg.addChild(loadingNode);

        var c = loadingNode.getComponent("loadingBar");
        c.setProgress(1);
        c.finishCallback = function () {
            cc.log("finishCallback");
            loadingNode.active = false;
            // 隐藏非Node组件需要调用.node
            this.loginBtn.active = true;
        }.bind(this);
    }

    start() {}

    onClickLogin() {
        if (this.loginViewNode == null) {
            this.loginViewNode = cc.instantiate(this.loginView);
            this.node.addChild(this.loginViewNode);

            this.loginViewNode = this.loginViewNode.getComponent("loginView");
        }
        this.loginViewNode.show();
    }
    onClickGuest() {
        cc.log("onClickWechat");
        this.showRegister();
    }
    onClickWechat() {
        cc.log("onClickWechat");
    }

    //模拟全局调用
    showRegister() {
        if (this.registerNode == null) {
            this.registerNode = cc.instantiate(this.registerView);
            this.node.addChild(this.registerNode);
            this.registerNode = this.registerNode.getComponent("registerView");
        }
        this.registerNode.show();
    }

    update(dt) {}
}
