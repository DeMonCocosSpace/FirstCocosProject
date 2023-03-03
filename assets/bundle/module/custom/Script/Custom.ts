import { ResLoader } from "../../../../main/core/bd/ResLoader";
import { UI } from "../../../common/Script/commpent/UIMgr";
import CustomSkin from "./conf/CustomSkin";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Custom extends cc.Component {
    protected onLoad(): void {
        UI.showUISync(CustomSkin.Priority.CustomView);
    }
}
