import ResLoader from "../../../main/core/bd/ResLoader";
import { https } from "../../../main/core/NpmExport";
import HttpUtils from "../../../main/core/utils/HttpUtils";
import HttpSkin from "./conf/HttpSkin";
import UserItem from "./UserItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HttpView extends cc.Component {
    @property(cc.Node)
    layout: cc.Node = null;
    protected onLoad(): void {}

    clickHttp() {
        HttpUtils.get("1.1/users").then((result) => {
            //this.label.string = JSON.stringify(result);

            const results = result["results"];
            results.forEach((element) => {
                ResLoader.getInstance().loadPrefab(
                    HttpSkin.UnPriority.UserItem,
                    (prefab: cc.Prefab) => {
                        const node = cc.instantiate(prefab);
                        this.layout.addChild(node);
                        node.getComponent(UserItem).init(element);
                    }
                );
            });
        });
    }
}
