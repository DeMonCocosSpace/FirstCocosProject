import { https } from "../../../main/core/NpmExport";
import HttpUtils from "../../../main/core/utils/HttpUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HttpView extends cc.Component {
    protected onLoad(): void {}

    clickHttp() {
        HttpUtils.get("1.1/users").then((result) => {
            cc.log("HttpView result=" + result);
        });
    }
}
