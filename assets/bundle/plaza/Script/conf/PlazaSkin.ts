import BaseBundleSkin from "../../../../main/core/bd/bd_skin/BaseBundleSkin";
import { BundleName } from "../../../../main/core/conf/BundleName";
import { SkinType } from "../../../../main/core/conf/SkinType";
import { PlazaResAnt } from "./PlazaResAnt";
import { PlazaResCar } from "./PlazaResCar";

type TBundleInfo = typeof PlazaResAnt & typeof PlazaResCar;
class PlazaSkin extends BaseBundleSkin<TBundleInfo> {
    protected skin: BdSkin.TSkinInfo = {
        [SkinType.ANT]: PlazaResAnt,
        [SkinType.CAR]: PlazaResCar,
    };

    constructor() {
        super(BundleName.PLAZA);
    }
}

export default new PlazaSkin();
