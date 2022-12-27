export default class Utils {

    public static showAlert(parent: cc.Node) {
        cc.resources.load('alert/alert', function (err, prefab) {
            var node = cc.instantiate(prefab);
            parent.addChild(node);
            var alert = node.getComponent('alert')
            alert.show('Hello prefab~',
                function () {
                    cc.log('用户点击了ok');
                },
                function () { cc.log('用户点击了cancel'); },
                function () { cc.log('close'); })
        }.bind(this));
    }

}