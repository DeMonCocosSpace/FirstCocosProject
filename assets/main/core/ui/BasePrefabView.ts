const { ccclass, property, executeInEditMode, menu } = cc._decorator;
/**
 * 自定义预制体View，
 * 添加到节点后不显示
 * 需要调用show来显示，调用hide隐藏
 */

@ccclass
@executeInEditMode
@menu("core/base/BasePrefabView")
export default class BasePrefabView extends cc.Component {
    show() {
        //enable组件可以控制BlockInputEvents是否生效
        this.enabled = true;
        //active = false时BlockInputEvents仍然生效
        this.node.active = true;
    }

    hide() {
        this.node.active = false;
        this.enabled = false;
    }

    goback() {
        this.hide();
    }
}
