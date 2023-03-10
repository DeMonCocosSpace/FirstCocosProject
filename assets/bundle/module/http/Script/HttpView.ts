import { ResLoader } from "../../../../main/core/bd/ResLoader";
import Listener from "../../../../main/core/event/Listener";
import HttpUtils, { HTTP } from "../../../../main/core/http/HttpUtils";
import { lodash } from "../../../../main/core/NpmExport";
import StorageManager from "../../../../main/core/storage/StorageManager";
import EnumController from "../../../../main/core/ui/EnumController";
import CheckBoxView from "../../../common/Script/CheckBoxView";
import { Alert, Toast } from "../../../common/Script/commpent/UIMgr";
import CommonSkin from "../../../common/Script/conf/CommonSkin";
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

    private list: PostResult[] = new Array();

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
                this.list = result.results.reverse();
                this.addAll();
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
                        //this.addOne(result);
                        this.list.unshift(result);
                        this.addAll();
                    });
            })
            .catch((error) => {
                Toast.show(error);
            });
    }

    private addAll() {
        // this.layout.removeAllChildren();
        this.layout.destroyAllChildren();
        this.list.forEach((element, index) => {
            this.addOne(element, index);
        });
    }

    private addOne(result: PostResult, index: number) {
        ResLoader.getInstance().loadPrefab(HttpSkin.UnPriority.UserItem, (prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            this.layout.addChild(node);
            node.getComponent(UserItem).init(result);

            index = index < 3 ? index : 3;
            node.getComponent(EnumController).show4Name(`${index}`);
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
        this.list = this.list.map((element) => {
            return element.objectId == result.objectId ? result : element;
        });
        const node = this.layout.getChildByUuid(uuid);
        if (node) {
            const ctrl = node.getComponent(UserItem);
            ctrl.init(result);
        }
    }

    onDeleteSucceed(uuid: string, result: PostResult) {
        lodash(this.list).remove((element) => {
            return element.objectId == result.objectId;
        });
        const node = this.layout.getChildByUuid(uuid);
        if (node) {
            this.layout.removeChild(node);
        }
    }
}
