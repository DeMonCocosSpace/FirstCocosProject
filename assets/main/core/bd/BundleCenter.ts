import lodash = require("lodash");
import { resolve } from "path";
import { CocosUtils } from "../utils/CocosUtils";
import { BundleDepend } from "../conf/bd_depend/BundleDepend";
import { BundleName } from "../conf/BundleName";
import BundleSkinCenter from "./bd_skin/BundleSkinCenter";
import { ResLoader } from "./ResLoader";
import { Log } from "../Log";
import { Loading } from "../../../bundle/common/Script/commpent/UIMgr";

type TBundleName = string;

type TBundle = BundleName;

export default class BundleCenter {
    private constructor() {}

    private static _instance = null;

    public static getInstance(): BundleCenter {
        if (!this._instance) {
            this._instance = new BundleCenter();
        }
        return this._instance;
    }

    private currentBundle: TBundle = null; //记录当前Bundle

    private bundleMap: Map<TBundleName, number> = new Map();

    @Log.method
    public launchSence(bundle: TBundle, sceneName?: string) {
        let onProgress = null;
        let onSuccess = null;
        let onFailed = null;

        const promise = this.load(
            bundle,
            (total, curNumer) => {
                //cc.log(`launchSence:${total},${curNumer}`);
                onProgress?.(total, curNumer);
            },
            () => {
                cc.error("[bundleCenter] bundle: scene failed");
            }
        )
            .then(() => {
                const bundleInfo = BundleSkinCenter.getInstance().getBundleInfo(bundle);
                sceneName = sceneName || bundleInfo.launchScene;
                cc.log(`launchSence:${sceneName}`);
                if (sceneName) {
                    //打开场景
                    cc.director.loadScene(sceneName, (error) => {
                        if (error) {
                            this.removeReference(bundle);
                            onFailed?.();
                        } else {
                            this.removeReference(this.currentBundle);
                            this.currentBundle = bundle;
                            onSuccess?.();

                            /**
                             * 场景加载成功保存上次场景，并记录当前场景
                             */
                            CocosUtils.lastSence = CocosUtils.currentSence;
                            CocosUtils.currentSence = sceneName;
                        }
                    });
                } else {
                    //预制体打开的页面
                    const prefabPath = bundleInfo.launchPrefabPath;
                    if (lodash.isEmpty(prefabPath)) {
                        cc.error(
                            `[bundleCenter] bundle:${bundle} Skin 未配置sceneName||launchPrefabPath 参数`
                        );
                        onFailed?.();
                    } else {
                        const scene = CocosUtils.getInstance().getSceneCanvas();
                        if (scene) {
                            ResLoader.getInstance().loadResFromBundle(
                                {
                                    bundleName: bundle,
                                    resPath: prefabPath,
                                    type: cc.Prefab,
                                },
                                (prefab: cc.Prefab) => {
                                    scene?.addChild(cc.instantiate(prefab));
                                    onSuccess?.();
                                }
                            );
                        } else {
                            onFailed?.();
                        }
                    }
                }
            })
            .catch(() => {
                onFailed?.();
            });

        if (this.bundleMap.has(BundleName.COMMON)) {
            Loading.applyLoading(promise);
        }
        //感觉有点类似builder模式
        const result = {
            onFailed: (callback: Function) => {
                onFailed = callback;
                return result;
            },
            onProgress: (callback: TProgressCallback) => {
                onProgress = callback;
                return result;
            },
            onSuccess: (callback: Function) => {
                onSuccess = callback;
                return result;
            },
            promise,
        };

        return result;
    }

    /**
     * load
     */
    public load(bundleName: TBundle, onProgress?: TProgressCallback, failed?: TFailed) {
        return this.loadDependencies(bundleName, onProgress, failed);
    }

    private async loadDependencies(
        bundleName: TBundle,
        onProgress?: TProgressCallback,
        failed?: TFailed
    ) {
        const bundles = this.findDependencies(bundleName);
        await this.loadBundles(bundles, onProgress, failed);
    }

    private async loadBundles(bundles: TBundle[], onProgress: TProgressCallback, failed?: TFailed) {
        cc.log(`loadBundles:${bundles}`);
        const item = 100;
        const TOTAL = item * bundles.length;

        for (let index = 0; index < bundles.length; index++) {
            const bundle = bundles[index];
            await this.loadBundleWithRes(
                bundle,
                (total: number, curNumber: number) => {
                    let progress = (curNumber / total) * item + item * index;
                    onProgress?.(TOTAL, isNaN(progress) ? 0 : progress);
                },
                failed
            );
            this.addReference(bundle);
        }
    }

    private addReference(bundle: TBundle) {
        const count = this.bundleMap.get(bundle) ?? 0;
        this.bundleMap.set(bundle, count + 1);
    }

    private removeReference(bundle: TBundle) {}

    private async loadBundleWithRes(
        bundleName: TBundle,
        onProgress?: TProgressCallback,
        failed?: TFailed
    ): Promise<boolean> {
        const bd = await ResLoader.getInstance().asyncLoadBundle(bundleName);
        if (!bd) {
            throw new Error("[BundleCenter] loading bundle failed!" + bundleName);
        }

        return new Promise((resolve, _) => {
            const bundleInfo = BundleSkinCenter.getInstance().getBundleInfo(bundleName);

            ResLoader.getInstance().loadResPackageFromBundle(
                bundleInfo,
                (total: number, curNumber: number) => {
                    onProgress?.(total, curNumber);
                    if (total <= curNumber) {
                        resolve(true);
                    }
                },
                () => {
                    failed?.();
                }
            );
        });
    }

    private findDependencies(bundle: TBundle, bundles: TBundle[] = []) {
        const depends: TBundle[] = BundleDepend.getDepend(bundle) ?? [];
        for (let bd of depends) {
            this.findDependencies(bd, bundles);
        }
        if (!bundles.includes(bundle)) {
            bundles.push(bundle);
        }
        return bundles;
    }
}
