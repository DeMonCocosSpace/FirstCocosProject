import { ResLoader } from "../../../../main/core/bd/ResLoader";
import BtnView from "../../../common/Script/BtnView";
import { UI } from "../../../common/Script/commpent/UIMgr";
import CommonSkin from "../../../common/Script/conf/CommonSkin";
import { ApiProto } from "./ApiProto";

const { ccclass, property } = cc._decorator;

export interface TestConf {
    title: string;
    func: (data?: any) => void;
}
@ccclass
export default class Test extends cc.Component {
    @property(cc.Layout)
    layout: cc.Layout = null;
    @property(cc.Sprite)
    bg: cc.Sprite = null;

    private testConf: TestConf[] = null;

    onLoad() {
        this.testConf = [
            {
                func: () => {
                    this.pick();
                },
                title: "Pick",
            },
            {
                func: () => {
                    this.returnType();
                },
                title: "ReturnType",
            },
        ];
        UI.setBg(this.bg);

        this.testConf.forEach((value, i, _) => {
            const pf = cc.instantiate(
                ResLoader.getInstance().getPrefab(CommonSkin.Priority.BtnView)
            );
            const ctrl = pf.getComponent(BtnView);
            ctrl.init({
                label: value.title,
                data: value,
                callback: value.func,
            });
            this.layout.node.addChild(pf);
        });
    }

    private pick(): void {
        type LoginInfo = Pick<ApiProto.LoginInfo, "toObject">["toObject"];
        const info: LoginInfo = () => {
            return {};
        };
    }
    private returnType(): void {
        cc.log("Test ReturnType");
        type LoginInfo = ReturnType<Pick<ApiProto.LoginInfo, "toObject">["toObject"]>;
        const info: LoginInfo = {};
    }
}
