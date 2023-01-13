export default class ResLoader {
    private bundles = <cc.AssetManager.Bundle>{};

    private constructor() {}

    private static _instance = null;

    public static getInstance(): ResLoader {
        if (!this._instance) {
            this._instance = new ResLoader();
        }
        return this._instance;
    }

    public loadResPackageFromBundle(
        bundleInfo: IBundleResInfo,
        progressFunc?: TProgressCallback,
        failed?: TFailed
    ) {
        this.loadResPackage(bundleInfo, progressFunc, failed);
    }

    private async loadResPackage(
        bundleInfo: IBundleResInfo,
        progressFunc?: TProgressCallback,
        failed?: TFailed
    ) {
        this.loadResWithObj(bundleInfo.bundleName, bundleInfo.priority, progressFunc, failed);
    }

    public async loadResWithObj(
        bundleName: string,
        obj: any,
        progressFunc?: TProgressCallback,
        failed?: TFailed
    ) {
        const resDescs: IResDescribe[] = this.getResDescList(obj);
        const total = resDescs.length;
        let curNumber = 0;
        let bundle = this.bundles[bundleName];
        if (!bundle) {
            bundle = await this.asyncLoadBundle(bundleName);
        }
        if (!bundle) {
            failed?.();
            return;
        }
        if (total == 0) {
            progressFunc?.(0, 0);
            return;
        }
        resDescs.forEach((v, i, _) => {
            this.loadBundleRes(bundle, v.resPath, v.type, (res: cc.Asset) => {
                if (!res) {
                    failed?.();
                }
                curNumber++;
                res?.addRef();
                progressFunc && progressFunc(total, curNumber);
            });
        });
    }

    private loadBundleRes<T extends typeof cc.Asset>(
        bundle: cc.AssetManager.Bundle,
        resPath: string,
        type: T,
        callback: (res: any) => void
    ) {
        if (!resPath) {
            callback && callback(null);
            return;
        }

        bundle.load(resPath, type, (error, res: any) => {
            if (error) {
                cc.error("[ResLoader loadBunleRes]:load Res " + resPath + " error: ", error);
                callback && callback(null);
            } else {
                callback && callback(res);
            }
        });
    }
    /**
     *  asyncLoadBundle
     */
    public async asyncLoadBundle(bundleName: string): Promise<cc.AssetManager.Bundle> {
        return new Promise((resolve, reject) => {
            if (!this.bundles[bundleName]) {
                //bundle加载过
                cc.log(
                    "[ResLoader loadBundle]:Please do not load the bundle repeatedly :" + bundleName
                );
                resolve(this.bundles[bundleName]);
            } else {
                cc.assetManager.loadBundle(bundleName, (error, bundle: cc.AssetManager.Bundle) => {
                    if (error) {
                        //加载失败
                        cc.error("[ResLoader loadBundle]:Load AssetsBundle Error: " + bundleName);
                        this.bundles[bundleName] = null;
                        resolve(null);
                    } else {
                        cc.log("[ResLoader loadBundle]:Load AssetsBundle Success: " + bundleName);
                        this.bundles[bundleName] = bundle;
                        resolve(bundle);
                    }
                });
            }
        });
    }

    private getResDescList(obj: any): IResDescribe[] {
        let desList: IResDescribe[] = [];
        this.traversalObj(obj, desList);
        return desList;
    }

    private traversalObj(obj: any, resList: IResDescribe[]) {
        for (const resObj of obj) {
            if (!resObj.resPath) {
                resList.push(resObj);
            } else {
                if (Array.isArray(resObj)) {
                    resObj.forEach((v) => {
                        resList.push(v);
                    });
                } else {
                    this.traversalObj(obj, resList);
                }
            }
        }
    }
}
