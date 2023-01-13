import { BundleName } from "../../conf/BundleName";

export default class BundleSkinCenter {
    private constructor() {}

    private static _instance = null;

    public static getInstance(): BundleSkinCenter {
        if (!this._instance) {
            this._instance = new BundleSkinCenter();
        }
        return this._instance;
    }

    private skinMap: Map<BundleName, BdSkin.IBundleSkin> = new Map();

    /**
     * applySkin
     */
    public applySkin(bundleName: BundleName, skin: BdSkin.IBundleSkin): void {
        this.skinMap.set(bundleName, skin);
    }

    /**
     * getSkin
     */
    public getSkin(bundleName: BundleName): BdSkin.IBundleSkin {
        return this.skinMap.get(bundleName);
    }

    /**
     * getBundleInfo
     */
    public getBundleInfo(bundleName: BundleName): IBundleResInfo {
        return this.getSkin(bundleName).getCurSkin();
    }
}
