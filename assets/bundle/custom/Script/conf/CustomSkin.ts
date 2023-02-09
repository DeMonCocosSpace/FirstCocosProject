import BaseBundleSkin from "../../../../main/core/bd/bd_skin/BaseBundleSkin";
import { BundleName } from "../../../../main/core/conf/BundleName";
import { SkinType } from "../../../../main/core/conf/SkinType";
import { CustomResAnt } from "./CustomResAnt";
import { CustomResCar } from "./CustomResCar";

type TBundleInfo = typeof CustomResAnt & typeof CustomResCar;
class CustomSkin extends BaseBundleSkin<TBundleInfo> {
    protected skin: BdSkin.TSkinInfo = {
        [SkinType.ANT]: CustomResAnt,
        [SkinType.CAR]: CustomResCar,
    };

    constructor() {
        super(BundleName.CUSTOM);
    }
}

export default new CustomSkin();
