import BaseBundleSkin from "../../../../../main/core/bd/bd_skin/BaseBundleSkin";
import { BundleName } from "../../../../../main/core/conf/BundleName";
import { SkinType } from "../../../../../main/core/conf/SkinType";
import { LoginResAnt } from "./LoginResAnt";
import { LoginResCar } from "./LoginResCar";

type TBundleInfo = typeof LoginResAnt & typeof LoginResCar;
class LoginSkin extends BaseBundleSkin<TBundleInfo> {
    protected skin: BdSkin.TSkinInfo = {
        [SkinType.ANT]: LoginResAnt,
        [SkinType.CAR]: LoginResCar,
    };

    constructor() {
        super(BundleName.LOGIN);
    }
}

export default new LoginSkin();
