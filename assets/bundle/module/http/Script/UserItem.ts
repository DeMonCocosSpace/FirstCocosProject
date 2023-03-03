import Listener from "../../../../main/core/event/Listener";
import HttpUtils from "../../../../main/core/http/HttpUtils";
import { Alert, Toast } from "../../../common/Script/commpent/UIMgr";
import HttpEvent from "./enevt/HttpEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UserItem extends cc.Component {
    @property(cc.Label)
    id: cc.Label = null;
    @property(cc.Label)
    content: cc.Label = null;
    @property(cc.Label)
    pubUser: cc.Label = null;
    @property(cc.Label)
    time: cc.Label = null;

    private element: PostResult;

    init(element: PostResult) {
        this.element = element;
        this.id.string = element.objectId;
        this.content.string = element.content;
        this.pubUser.string = element.pubUser;
        this.time.string = new Date(element.updatedAt).toFormat();
    }

    onEdit() {
        Alert.showEditAlert(this.element.content)
            .then((text: string) => {
                HttpUtils.getHttp()
                    .put<PostResult>("classes/Post", this.element.objectId, {
                        content: text,
                    })
                    .then((result) => {
                        result["content"] = text;
                        result["pubUser"] = this.element.pubUser;
                        Listener.send(HttpEvent.EDIT_SUCCEED, this.node.uuid, result);
                    });
            })
            .catch((error) => {
                Toast.show(error);
            });
    }

    onDelete() {
        Alert.showAlert("确认删除？").then((de: boolean) => {
            if (de) {
                HttpUtils.getHttp()
                    .delete<PostResult>("classes/Post", this.element.objectId)
                    .then((result) => {
                        Listener.send(HttpEvent.DELETE_SUCCEED, this.node.uuid, result);
                    });
            }
        });
    }
}
