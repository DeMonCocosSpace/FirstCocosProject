import BaseBundleSkin from "../../../../main/core/bd/bd_skin/BaseBundleSkin";
import { BundleName } from "../../../../main/core/conf/BundleName";
import { SkinType } from "../../../../main/core/conf/SkinType";
import { HttpResAnt } from "./HttpResAnt";
import { HttpResCar } from "./HttpResCar";

type TBundleInfo = typeof HttpResAnt & typeof HttpResCar;
class HttpSkin extends BaseBundleSkin<TBundleInfo> {
    protected skin: BdSkin.TSkinInfo = {
        [SkinType.ANT]: HttpResAnt,
        [SkinType.CAR]: HttpResCar,
    };

    constructor() {
        super(BundleName.HTTP);
    }
}

export default new HttpSkin();
