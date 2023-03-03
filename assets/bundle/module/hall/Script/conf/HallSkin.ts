import BaseBundleSkin from "../../../../../main/core/bd/bd_skin/BaseBundleSkin";
import { BundleName } from "../../../../../main/core/conf/BundleName";
import { SkinType } from "../../../../../main/core/conf/SkinType";
import { HallResAnt } from "./HallResAnt";
import { HallResCar } from "./HallResCar";

type TBundleInfo = typeof HallResAnt & typeof HallResCar;
class HallSkin extends BaseBundleSkin<TBundleInfo> {
    protected skin: BdSkin.TSkinInfo = {
        [SkinType.ANT]: HallResAnt,
        [SkinType.CAR]: HallResCar,
    };

    constructor() {
        super(BundleName.HALL);
    }
}

export default new HallSkin();
