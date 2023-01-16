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
     * loadResFromBundle
     */
    public loadResFromBundle<T>(resObj: IResDescribe, callback?: (res: T) => void): Promise<T> {
        return new Promise((resolve) => {
            this.loadOneResFromBundle(resObj.bundleName, resObj, (res) => {
                resolve(res);
            });
        });
    }

    /**
     * 从bundle中加载单个资源 如果bundle还没有加载那么会先加载bundle 然后再加载bundle中的资源
     * @param resObj
     * @param callback
     * @returns
     */
    public loadOneResFromBundle(
        bundleName: string,
        resObj: IResDescribe,
        callback?: (res: any) => void
    ) {
        const bundle = this.bundles[bundleName];
        if (!bundle) {
            this.loadBundle(bundleName, (assetBunlde: cc.AssetManager.Bundle) => {
                if (assetBunlde) {
                    this.loadBundleRes(bundle, resObj.resPath, resObj.type, callback);
                } else {
                    callback?.(null);
                }
            });
        } else {
            this.loadBundleRes(bundle, resObj.resPath, resObj.type, callback);
        }
    }

    public loadBundle(bundleName: string, callback?: (bundle: cc.AssetManager.Bundle) => void) {
        if (this.bundles[bundleName]) {
            callback?.(this.bundles[bundleName]);
        } else {
            cc.assetManager.loadBundle(bundleName, (error, bunlde: cc.AssetManager.Bundle) => {
                this.bundles[bundleName] = error ? null : bunlde;
                callback?.(error ? null : bunlde);
            });
        }
    }

    public getPrefab(resObj: IResDescribe): cc.Prefab {
        return this.getResFromBundle(resObj);
    }

    public getSpriteFrame(resObj: IResDescribe): cc.SpriteFrame {
        return this.getResFromBundle(resObj);
    }

    /**
     * 从bundle中获取单个资源 bundle以及bundle中的资源必须已经提前载入了以后才能正确获取到
     * @param resDesObj 资源描述对象
     */
    public getResFromBundle(resObj: IResDescribe): any {
        const bundle: cc.AssetManager.Bundle = this.bundles[resObj.bundleName];
        if (!bundle) {
            cc.error("[ResLoader getRes]:bundle is not exist!!!", resObj);
            return null;
        } else {
            return bundle.get(resObj.resPath, resObj.type);
        }
    }

    /**
     *  asyncLoadBundle
     */
    public async asyncLoadBundle(bundleName: string): Promise<cc.AssetManager.Bundle> {
        return new Promise((resolve, reject) => {
            if (this.bundles[bundleName]) {
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

    private traversalObj(obj: Object, resList: IResDescribe[]) {
        for (const key in obj) {
            let resObj = obj[key];
            if (resObj.hasOwnProperty("resPath")) {
                resList.push(resObj);
            } else {
                if (Array.isArray(resObj)) {
                    for (let i = 0, len = resObj.length; i < len; i++) {
                        resList.push(resObj[i]);
                    }
                } else {
                    this.traversalObj(resObj, resList);
                }
            }
        }
    }
}
