import { lodash } from "../NpmExport";
import { Tools } from "../Tools";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("core/ui/ObjectLabel")
export default class ObjectLabel extends cc.Component {
    @property
    text: string = "";

    private newText: string = "";

    // LIFE-CYCLE CALLBACKS:
    private regExp = "{[^}]+}";

    private _object: { [index: string]: string | number };
    public get object(): { [index: string]: string | number } {
        return this._object;
    }
    public set object(v: { [index: string]: string | number }) {
        this._object = lodash.merge(
            {
                CUR: "", //ProjectInfo.getInstance().CurrentIntConf.currency,
            },
            v
        );
        this.matchArgs(this._object);
    }

    onLoad() {
        this.matchArgs();
    }

    start() {}

    private matchArgs(args?: { [index: string]: string | number }) {
        let result = Tools.formatString(this.text, args);
        this.getLabel().string = result;
    }

    public updateText() {
        this.matchArgs();
    }

    getLabel() {
        return this.getComponent(cc.Label) || this.getComponent(cc.RichText);
    }
    // update (dt) {}
}
