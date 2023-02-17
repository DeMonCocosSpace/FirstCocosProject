import BundleSkinCenter from "../bd/bd_skin/BundleSkinCenter";
import { BundleName } from "../conf/BundleName";
import PlayButtonSoundComp from "../ui/PlayButtonSoundComp";

export class PlayButtonSoundUtils {
    private static _instance: PlayButtonSoundUtils = null;

    public static getInstance() {
        if (!this._instance) {
            this._instance = new PlayButtonSoundUtils();
        }
        return this._instance;
    }

    private constructor() {}

    public buttonPlaySoundHandle(rootNode: cc.Node) {
        if (cc.isValid(rootNode)) {
            this.tryAddPlaySoundComp(rootNode);
            this.childNodeButtonPlaySoundHandle(rootNode);
        }
    }

    private childNodeButtonPlaySoundHandle(rootNode: cc.Node) {
        rootNode.children.forEach((childNode: cc.Node) => {
            this.tryAddPlaySoundComp(childNode);
            this.childNodeButtonPlaySoundHandle(childNode);
        });
    }

    public tryAddPlaySoundComp(node: cc.Node) {
        if (cc.isValid(node)) {
            let button = node.getComponent(cc.Button);
            if (button) {
                this.addPlaySoundComp(node);
            }
        }
    }

    public addPlaySoundComp(node: cc.Node) {
        if (cc.isValid(node)) {
            let playButtonSoundComp = node.getComponent(PlayButtonSoundComp);
            if (!playButtonSoundComp) {
                playButtonSoundComp = node.addComponent(PlayButtonSoundComp);

                let bundleInfo = BundleSkinCenter.getInstance().getBundleInfo(BundleName.COMMON);
                let resDescribe = bundleInfo.loadOnDemand.btnEffect as IResDescribe;
                resDescribe.bundleName = BundleName.COMMON;

                playButtonSoundComp.setResBundleName(resDescribe.bundleName);
                playButtonSoundComp.setSoundPath(resDescribe.resPath);
                playButtonSoundComp.setIsPlay(true);
            }
        }
    }
}
