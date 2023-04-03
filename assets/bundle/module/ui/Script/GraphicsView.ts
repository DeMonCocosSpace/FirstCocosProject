import { ResLoader } from "../../../../main/core/bd/ResLoader";
import HttpUtils, { HTTP } from "../../../../main/core/http/HttpUtils";
import PopUpViewBase from "../../../../main/core/ui/popup/PopUpViewBase";
import CheckBoxView from "../../../common/Script/CheckBoxView";
import CommonSkin from "../../../common/Script/conf/CommonSkin";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GraphicsView extends PopUpViewBase {
    @property(cc.Graphics)
    graphics: cc.Graphics = null;
    @property(cc.Node)
    toggles: cc.Node = null;

    private _needPoint = 0;
    private _points: cc.Vec2[] = [];

    onLoad() {
        this.hasBack = true;

        const ways = ["线条", "矩形", "圆形", "椭圆", "曲线", "二次贝塞尔", "三次贝塞尔"];
        ways.forEach((element, index) => {
            const node = cc.instantiate(
                ResLoader.getInstance().getPrefab(CommonSkin.Priority.CheckBoxView)
            );
            this.toggles.addChild(node);
            const ctrl: CheckBoxView = node.getComponent(CheckBoxView);
            ctrl.init(element, (v: string) => {});
            ctrl.setCheck(index == 0);
        });
        this.node.parent.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);

        //cc.debug.setDisplayStats(false);
        let p1: cc.Vec2 = cc.v2(-cc.winSize.width, 0);
        let p2: cc.Vec2 = cc.v2(200, 200);
        let p3: cc.Vec2 = cc.v2(400, 150);
        let p4: cc.Vec2 = cc.v2(500, 200);
        this.drawPoint(p1);
        this.drawPoint(p2);
        this.drawPoint(p3);
        this.drawPoint(p4);
        this.drawLine(p1, p2, cc.Color.GREEN);
        this.drawLine(p2, p3, cc.Color.GREEN);
        this.drawLine(p3, p4, cc.Color.GREEN);

        this.drawBezierLine(p1, p2, p3, p4, cc.Color.RED);

        // let posArr:Array<cc.Vec2> = [cc.v2(353,383),cc.v2(670,266)
        //     ,cc.v2(403,128)
        //     ,cc.v2(148,369)
        //     ,cc.v2(400,513)
        //     ,cc.v2(564,503)
        //     ,cc.v2(582,378)
        //     ,cc.v2(682,878),cc.v2(182,878)]

        let posArr1: Array<cc.Vec2> = [
            cc.v2(-150, 80),
            cc.v2(1, 80),
            cc.v2(48, 92),
            cc.v2(167, 159),
            cc.v2(309, 271),
            cc.v2(421, 394),
            cc.v2(514, 498),
            cc.v2(597, 572),
            cc.v2(658, 590),
            cc.v2(745, 550),
            cc.v2(802, 465),
            cc.v2(841, 320),
            cc.v2(866, 266),
            cc.v2(951, 163),
            cc.v2(1054, 133),
            cc.v2(1228, 126),
            cc.v2(1278, 128),
            cc.v2(1430, 128),
        ];

        let self = this;
        this.scheduleOnce(() => {
            self.drawSelfBzierLine([p1, p2, p3, p4]);
            self.drawSelfBzierLine(posArr1);
        }, 2);
    }

    onTouchEnd(event) {
        var touchLoc = event.getLocation();
        CC_DEBUG && cc.log("GraphicsView " + touchLoc);

        this._points.push(touchLoc);
        if (this._points.length >= this._needPoint) {
        }
    }

    /**在pos点处画画半径为6像素的黄点*/
    drawPoint(pos: cc.Vec2): void {
        let r: number = 6;
        //this.graphics.clear();
        this.graphics.circle(pos.x, pos.y, r);

        this.graphics.fillColor = cc.Color.YELLOW;
        this.graphics.fill();
    }

    /**
     * 画一条指定起始点和颜色的直线
     * @param p1 起点
     * @param p2 终点
     * @param col 颜色
     */
    drawLine(p1: cc.Vec2, p2: cc.Vec2, col: cc.Color): void {
        let lineWidth: number = 3;

        this.graphics.lineWidth = lineWidth;
        this.graphics.strokeColor = col;
        this.graphics.moveTo(p1.x, p1.y);
        this.graphics.lineTo(p2.x, p2.y);
        this.graphics.stroke();
    }

    /**
     * 画三阶bezier曲线
     * @param p0 起点
     * @param p1 控制点
     * @param p2 控制点
     * @param p3 终点
     * @param col 颜色
     */
    drawBezierLine(p0: cc.Vec2, p1: cc.Vec2, p2: cc.Vec2, p3: cc.Vec2, col: cc.Color): void {
        let lineWidth: number = 3;

        //this.graphics.clear();
        this.graphics.lineWidth = lineWidth;
        this.graphics.strokeColor = col;
        this.graphics.moveTo(p0.x, p0.y);
        this.graphics.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        this.graphics.stroke();
    }

    drawSelfBzierLine(ctrlPosArr: Array<cc.Vec2>): void {
        let posArr: Array<cc.Vec2> = new Array<cc.Vec2>();
        posArr = this.getBezierPos(ctrlPosArr, 1000);
        this.drawLinesByBzierPos(posArr);
    }

    drawLinesByBzierPos(posArr: Array<cc.Vec2>): void {
        cc.log("drawLinesByBzierPos");
        cc.log(posArr);
        if (!posArr || posArr.length < 2) {
            cc.warn(posArr);
            return;
        }

        for (let index = 0; index < posArr.length - 2; index++) {
            let p1: cc.Vec2 = posArr[index];
            let p2: cc.Vec2 = posArr[index + 1];

            this.drawLine(p1, p2, cc.Color.ORANGE);
        }
    }

    /**
     *
     * @param ctrlPosArr 贝塞尔曲线控制点坐标
     * @param precison 精度，需要计算的该条贝塞尔曲线上的点的数目
     * @param resArr 该条贝塞尔曲线上的点（二维坐标）
     */
    getBezierPos(ctrlPosArr: Array<cc.Vec2>, precison: number): Array<cc.Vec2> {
        cc.log(ctrlPosArr);
        let resArr: Array<cc.Vec2> = new Array<cc.Vec2>();

        /**贝塞尔曲线控制点数目（阶数）*/
        let number: number = ctrlPosArr.length;

        if (number < 2) {
            cc.log("控制点数不能小于 2");
            return resArr;
        }

        /**杨辉三角数据 */
        let yangHuiArr: Array<number> = this.getYangHuiTriangle(number);

        //计算坐标
        for (let i = 0; i < precison; i++) {
            let t: number = i / precison;
            let tmpX: number = 0;
            let tmpY: number = 0;

            for (let j = 0; j < number; j++) {
                tmpX +=
                    Math.pow(1 - t, number - j - 1) *
                    ctrlPosArr[j].x *
                    Math.pow(t, j) *
                    yangHuiArr[j];

                tmpY +=
                    Math.pow(1 - t, number - j - 1) *
                    ctrlPosArr[j].y *
                    Math.pow(t, j) *
                    yangHuiArr[j];
            }

            // resArr[i].x = tmpX;
            // resArr[i].y = tmpY;

            resArr[i] = new cc.Vec2(tmpX, tmpY);
        }

        return resArr;
    }

    /**
     * 获取杨辉三角对应阶数的值
     * @param num 杨辉三角阶数
     */
    getYangHuiTriangle(num: number): Array<number> {
        //计算杨辉三角
        let yangHuiArr = new Array<number>();

        if (num === 1) {
            yangHuiArr[0] = 1;
        } else {
            yangHuiArr[0] = yangHuiArr[1] = 1;

            for (let i = 3; i <= num; i++) {
                let t = new Array<number>();
                for (let j = 0; j < i - 1; j++) {
                    t[j] = yangHuiArr[j];
                }

                yangHuiArr[0] = yangHuiArr[i - 1] = 1;
                for (let j = 0; j < i - 2; j++) {
                    yangHuiArr[j + 1] = t[j] + t[j + 1];
                }
            }
        }

        cc.log(yangHuiArr);
        return yangHuiArr;
    }
}
