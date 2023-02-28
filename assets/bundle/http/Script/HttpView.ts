import { ResLoader } from "../../../main/core/bd/ResLoader";
import Listener from "../../../main/core/event/Listener";
import HttpUtils, { HTTP } from "../../../main/core/http/HttpUtils";
import StorageManager from "../../../main/core/storage/StorageManager";
import CheckBoxView from "../../common/Script/CheckBoxView";
import { Alert, Toast } from "../../common/Script/commpent/UIMgr";
import CommonSkin from "../../common/Script/conf/CommonSkin";
import HttpSkin from "./conf/HttpSkin";
import HttpEvent from "./enevt/HttpEvent";
import UserItem from "./UserItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HttpView extends cc.Component {
    @property(cc.Label)
    user: cc.Label = null;
    @property(cc.Node)
    layout: cc.Node = null;
    @property(cc.Node)
    toggles: cc.Node = null;

    private username: string = "";
    protected onLoad(): void {
        const account_info = StorageManager.getInstance().getItem("account_info", null);
        if (account_info) {
            const userJson = JSON.parse(account_info);
            this.username = userJson["username"];
            this.user.string = "当前用户：" + this.username;
        }
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

        this.clickLookup();
    }

    clickLookup() {
        HttpUtils.getHttp()
            .get<PostList>("classes/Post")
            .then((result) => {
                this.layout.removeAllChildren();
                const list = result.results.reverse();
                list.forEach((element) => {
                    this.addOne(element);
                });
            })
            .catch((error) => {});
    }

    clickAdd() {
        Alert.showEditAlert()
            .then((str: string) => {
                const body: PostResult = {
                    content: str,
                    pubUser: this.username,
                };
                HttpUtils.getHttp()
                    .post<PostResult>("classes/Post", body)
                    .then((result) => {
                        result["content"] = str;
                        result["pubUser"] = this.username;
                        result["updatedAt"] = result.createdAt;
                        this.addOne(result);
                    });
            })
            .catch((error) => {
                Toast.show(error);
            });
    }

    private addOne(result: PostResult) {
        ResLoader.getInstance().loadPrefab(HttpSkin.UnPriority.UserItem, (prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            this.layout.addChild(node);
            node.getComponent(UserItem).init(result);
        });
    }

    protected onEnable(): void {
        Listener.listen(HttpEvent.EDIT_SUCCEED, this.onEditSucceed, this);
        Listener.listen(HttpEvent.DELETE_SUCCEED, this.onDeleteSucceed, this);
    }

    protected onDisable(): void {
        Listener.listenOffTarget(this);
    }

    onEditSucceed(uuid: string, result: PostResult) {
        const node = this.layout.getChildByUuid(uuid);
        if (node) {
            const ctrl = node.getComponent(UserItem);
            ctrl.init(result);
        }
    }

    onDeleteSucceed(uuid: string) {
        const node = this.layout.getChildByUuid(uuid);
        if (node) {
            this.layout.removeChild(node);
        }
    }
}
