import { resolve } from "path";
import { BundleDepend } from "../conf/bd_depend/BundleDepend";
import { BundleName } from "../conf/BundleName";
import BundleSkinCenter from "./bd_skin/BundleSkinCenter";
import ResLoader from "./ResLoader";

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

    private bundleMap: Map<TBundleName, number> = new Map();

    public launchSence(bundle: TBundle, senceName?: string) {
        this.load(
            bundle,
            (total, curNumer) => {},
            () => {}
        )
            .then(() => {})
            .catch(() => {});
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
        const item = 100;
        const TOTAL = item * bundles.length;

        bundles.forEach(async (bundle, index, _) => {
            await this.loadBundleWithRes(
                bundle,
                (total: number, curNumber: number) => {
                    const progres = ((curNumber / total) * item) / TOTAL;
                    onProgress?.(TOTAL, progres);
                    this.addReference(bundle);
                },
                failed
            );
        });
    }

    private addReference(bundle: TBundle) {
        const count = this.bundleMap.get(bundle) ?? 0;
        this.bundleMap.set(bundle, count + 1);
    }

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
