import BaseBundleSkin from "../../../../../main/core/bd/bd_skin/BaseBundleSkin";
import { BundleName } from "../../../../../main/core/conf/BundleName";
import { SkinType } from "../../../../../main/core/conf/SkinType";
import { AnimResAnt } from "./AnimResAnt";
import { AnimResCar } from "./AnimResCar";

type TBundleInfo = typeof AnimResAnt & typeof AnimResCar;
class AnimSkin extends BaseBundleSkin<TBundleInfo> {
    protected skin: BdSkin.TSkinInfo = {
        [SkinType.ANT]: AnimResAnt,
        [SkinType.CAR]: AnimResCar,
    };

    constructor() {
        super(BundleName.ANIM);
    }
}

export default new AnimSkin();
