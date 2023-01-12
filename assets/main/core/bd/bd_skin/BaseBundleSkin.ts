import { BundleName } from "../../conf/BundleName";
import { SkinType } from "../../conf/SkinType";
import BundleSkinCenter from "../BundleSkinCenter";

export default abstract class BaseBundleSkin<T extends IBundleResInfo>
    implements BdSkin.IBundleSkin
{
    constructor(protected bundleName: BundleName) {
        BundleSkinCenter.getInstance().applySkin(bundleName, this);
    }

    protected abstract skin: BdSkin.TSkinInfo;

    getCurSkin(): BdSkin.TBundleInfo<T> {
        return {
            bundleName: this.bundleName,
            ...this.skin[SkinType.FINAL],
        };
    }

    /**
     *
     */
    public skinProxy<K extends IResDescribe>(array: K): IResDescribe {
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

        return new Proxy(array, {
            get: (targt: K, p: string, r: any): IResDescribe => {
                const result = targt[p];
                if (result.resPath && result.type) {
                    setBundleName(result);
                } else {
                    foreachDesc(result);
                }
                return result;
            },
        });
    }
}
