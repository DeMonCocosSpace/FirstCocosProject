import { BundleName } from "../../conf/BundleName";
import Flavor from "../../conf/Flavor";
import { SkinType } from "../../conf/SkinType";
import BundleSkinCenter from "./BundleSkinCenter";

export default abstract class BaseBundleSkin<T extends IBundleResInfo>
    implements BdSkin.IBundleSkin
{
    constructor(protected bundleName: BundleName) {
        BundleSkinCenter.getInstance().applySkin(bundleName, this);
    }

    protected abstract skin: BdSkin.TSkinInfo;

    public getCurSkin(): BdSkin.TBundleInfo<T> {
        return {
            bundleName: this.bundleName,
            ...(this.skin[Flavor.Skin.currMainSkin] ?? this.skin[SkinType.FINAL]),
        };
    }

    /**
     * 代理
     * 对皮肤进行bundleName赋值
     */
    public skinProxy<K extends { [index: string]: any }>(array: K): K {
        if (array === undefined) {
            return {} as any;
        }

        const setBundleName = (res: IResDescribe) => {
            res.bundleName = this.bundleName;
        };

        const foreachDesc = (desc: IResDescribe[]) => {
            for (const key in desc) {
                if (desc[key].resPath && desc[key].type) {
                    setBundleName(desc[key]);
                } else {
                    foreachDesc(desc[key] as any);
                }
            }
        };

        const proxy = new Proxy(array, {
            get: (targt: K, p: string, r: any): IBundleDesc => {
                const result = targt[p];
                if (result.resPath && result.type) {
                    setBundleName(result);
                } else {
                    foreachDesc(result);
                }
                return result;
            },
        });
        return proxy;
    }

    public get Priority() {
        return this.skinProxy(this.getCurSkin().priority);
    }

    public get UnPriority() {
        return this.skinProxy(this.getCurSkin().unpriority);
    }

    public get LoadOnDemand() {
        return this.skinProxy(this.getCurSkin().loadOnDemand);
    }

    public get Config() {
        return this.getCurSkin().config;
    }
}
