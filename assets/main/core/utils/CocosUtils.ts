export class CocosUtils {
    private constructor() {}

    private static _instance = null;

    public static getInstance(): CocosUtils {
        if (!this._instance) {
            this._instance = new CocosUtils();
        }
        return this._instance;
    }

    public static currentSence = null;
    public static lastSence = null;

    //获取当前的Canvas
    public getSceneCanvas() {
        if (cc.director) {
            let directorScene = cc.director.getScene();
            if (cc.isValid(directorScene)) {
                let canvas = directorScene.getChildByName("Canvas");
                if (cc.isValid(canvas)) {
                    return canvas;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
        return null;
    }

    public goBack() {
        CocosUtils.lastSence && cc.director.loadScene(CocosUtils.lastSence);
    }

    public goPlaza() {
        cc.director.loadScene("Plaza");
    }
}
