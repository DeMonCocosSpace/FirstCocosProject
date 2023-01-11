// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import LoginView from "./LoginView";
import ProgressView from "./ProgressView";
import RegisterView from "./RegisterView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Loading extends cc.Component {
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

    onLoad() {
        let loadingNode = cc.instantiate(this.loadingbar);
        loadingNode.y = -150;
        this.bg.addChild(loadingNode);

        const c: ProgressView = loadingNode.getComponent(ProgressView);
        c.setProgress(1);
        c.finishCallback = () => {
            cc.log("finishCallback");
            loadingNode.active = false;
            // 隐藏非Node组件需要调用.node
            this.loginBtn.active = true;
        };
    }

    start() {}

    onClickAccount() {
        if (this.loginViewNode == null) {
            this.loginViewNode = cc.instantiate(this.loginView);
            this.node.addChild(this.loginViewNode);

            this.loginViewNode = this.loginViewNode.getComponent(LoginView);
        }
        this.loginViewNode.show();
    }
    onClickGuest() {
        cc.log("onClickWechat");
        //切换场景
        cc.director.loadScene("Plaza");
    }
    onClickRegister() {
        cc.log("onClickRegister");
        this.showRegister();
    }

    showRegister() {
        if (this.registerNode == null) {
            this.registerNode = cc.instantiate(this.registerView);
            this.node.addChild(this.registerNode);
            this.registerNode = this.registerNode.getComponent(RegisterView);
        }
        this.registerNode.show();
    }

    update(dt) {}
}
