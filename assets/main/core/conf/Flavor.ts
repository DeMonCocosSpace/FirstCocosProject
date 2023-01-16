import ProjectConf from "./ProjectConf";
import { SkinType } from "./SkinType";

class Skin {
    public static currMainSkin = ProjectConf.deafault_skin;

    public static isAnt() {
        return this.currMainSkin == SkinType.ANT;
    }

    public static isCar() {
        return this.currMainSkin == SkinType.CAR;
    }
}

export default { Skin };
