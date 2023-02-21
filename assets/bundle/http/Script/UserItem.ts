const { ccclass, property } = cc._decorator;

@ccclass
export default class UserItem extends cc.Component {
    @property(cc.Label)
    id: cc.Label = null;
    @property(cc.Label)
    username: cc.Label = null;
    @property(cc.Label)
    time: cc.Label = null;

    init(element: any) {
        this.id.string = element["objectId"];
        this.username.string = element["username"];
        this.time.string = element["updatedAt"];
    }

    onEdit() {}
    onDelete() {}
}
