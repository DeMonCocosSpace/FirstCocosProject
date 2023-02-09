import AlertView from "../../bundle/common/Script/AlertView";
import CommonSkin from "../../bundle/common/Script/conf/CommonSkin";
import ResLoader from "./bd/ResLoader";
import CocosUtils from "./CocosUtils";

export default class AlertUtils {
    //静态方法显示预制体
    public static showAlert(content: string) {
        const pf = cc.instantiate(ResLoader.getInstance().getPrefab(CommonSkin.Priorty.AlertView));
        var alert = pf.getComponent(AlertView);
        alert
            .build(
                content,
                function () {
                    cc.log("用户点击了ok");
                },
                function () {
                    cc.log("用户点击了cancel");
                },
                function () {
                    cc.log("close");
                }
            )
            .show();
        CocosUtils.getInstance().getSceneCanvas().addChild(pf);
    }
}
