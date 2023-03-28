import BaseBundleSkin from "../../../../../main/core/bd/bd_skin/BaseBundleSkin";
import { BundleName } from "../../../../../main/core/conf/BundleName";
import { SkinType } from "../../../../../main/core/conf/SkinType";
import { UIResAnt } from "./UIResAnt";
import { UIResCar } from "./UIResCar";

type TBundleInfo = typeof UIResAnt & typeof UIResCar;
class UISkin extends BaseBundleSkin<TBundleInfo> {
    protected skin: BdSkin.TSkinInfo = {
        [SkinType.ANT]: UIResAnt,
        [SkinType.CAR]: UIResCar,
    };

    constructor() {
        super(BundleName.UI);
    }
}

export default new UISkin();
