import BaseBundleSkin from "../../../../../main/core/bd/bd_skin/BaseBundleSkin";
import { BundleName } from "../../../../../main/core/conf/BundleName";
import { SkinType } from "../../../../../main/core/conf/SkinType";
import { TestResAnt } from "./TestResAnt";
import { TestResCar } from "./TestResCar";

type TBundleInfo = typeof TestResAnt & typeof TestResCar;
class TestSkin extends BaseBundleSkin<TBundleInfo> {
    protected skin: BdSkin.TSkinInfo = {
        [SkinType.ANT]: TestResAnt,
        [SkinType.CAR]: TestResCar,
    };

    constructor() {
        super(BundleName.TEST);
    }
}

export default new TestSkin();
