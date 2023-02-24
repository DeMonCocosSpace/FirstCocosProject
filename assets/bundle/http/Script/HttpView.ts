import ResLoader from "../../../main/core/bd/ResLoader";
import HttpUtils, { HTTP } from "../../../main/core/http/HttpUtils";
import StorageManager from "../../../main/core/storage/StorageManager";
import CheckBoxView from "../../common/Script/CheckBoxView";
import CommonSkin from "../../common/Script/conf/CommonSkin";
import HttpSkin from "./conf/HttpSkin";
import UserItem from "./UserItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HttpView extends cc.Component {
    @property(cc.Node)
    layout: cc.Node = null;
    @property(cc.Node)
    toggles: cc.Node = null;

    protected onLoad(): void {
        const httpways = ["fecth", "https", "XHR"];
        httpways.forEach((element, index) => {
            const node = cc.instantiate(
                ResLoader.getInstance().getPrefab(CommonSkin.Priority.CheckBoxView)
            );
            this.toggles.addChild(node);
            const ctrl: CheckBoxView = node.getComponent(CheckBoxView);
            ctrl.init(element, (v: string) => {
                const indexOf = httpways.indexOf(v);
                HttpUtils.setMode(indexOf);
                StorageManager.getInstance().setNumber("Http_Way", indexOf);
            });
            ctrl.setCheck(index == StorageManager.getInstance().getNumber("Http_Way", HTTP.FETCH));
        });
    }

    clickLookup() {
        HttpUtils.getHttp()
            .get<UserList>("1.1/users")
            .then((result) => {
                result.results.forEach((element) => {
                    ResLoader.getInstance().loadPrefab(
                        HttpSkin.UnPriority.UserItem,
                        (prefab: cc.Prefab) => {
                            const node = cc.instantiate(prefab);
                            this.layout.addChild(node);
                            node.getComponent(UserItem).init(element);
                        }
                    );
                });
            })
            .catch((error) => {});
    }

    clickAdd() {}
}
