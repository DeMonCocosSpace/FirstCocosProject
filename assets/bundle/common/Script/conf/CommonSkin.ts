import BaseBundleSkin from "../../../../main/core/bd/bd_skin/BaseBundleSkin";
import { BundleName } from "../../../../main/core/conf/BundleName";
import { SkinType } from "../../../../main/core/conf/SkinType";
import { CommonResAnt } from "./CommonResAnt";
import { CommonResCar } from "./CommonResCar";

type TBundleInfo = typeof CommonResAnt & typeof CommonResCar;
class CommonSkin extends BaseBundleSkin<TBundleInfo> {
    protected skin: BdSkin.TSkinInfo = {
        [SkinType.ANT]: CommonResAnt,
        [SkinType.CAR]: CommonResCar,
    };

    constructor() {
        super(BundleName.COMMON);
    }
}

export default new CommonSkin();
