import { ResLoader } from "../../../../main/core/bd/ResLoader";
import PopUpViewBase from "../../../../main/core/ui/popup/PopUpViewBase";
import { LineUtils } from "../../../../main/core/utils/LineUtils";
import CheckGroupView from "../../../common/Script/CheckGroupView";
import { UI } from "../../../common/Script/commpent/UIMgr";
import CommonSkin from "../../../common/Script/conf/CommonSkin";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GraphicsView extends PopUpViewBase {
    @property(cc.Graphics)
    graphics: cc.Graphics = null;

    private startPointColor = cc.Color.GREEN;
    private endPointColor = cc.Color.RED;

    private lineClolor = cc.Color.BLUE;
    private lineWidth: number = 5;
    private _currentIndex = 0;

    private _points: cc.Vec2[] = [];

    private startPoint: cc.Vec2 = null;
    private endPoint: cc.Vec2 = null;

    onLoad() {
        this.hasBack = true;

        this.graphics.lineWidth = this.lineWidth;
        this.graphics.strokeColor = this.lineClolor;

        const ways = ["线条", "矩形", "圆形", "椭圆", "曲线", "二次贝塞尔", "三次贝塞尔"];
        const node = cc.instantiate(
            ResLoader.getInstance().getPrefab(CommonSkin.Priority.CheckGroupView)
        );
        UI.setWidget(node, { left: 120, top: 20 });
        this.node.addChild(node);
        const ctrl: CheckGroupView = node.getComponent(CheckGroupView);
        ctrl.init(ways, (index, v) => {
            CC_DEBUG && cc.log("GraphicsView " + v);
            this._currentIndex = index;
            this.reset();
        });

        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    private reset() {
        this._points = [];
        this.startPoint = null;
        this.endPoint = null;
        this.graphics.clear();
        switch (this._currentIndex) {
            case 1:
            case 2:
                this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
                break;
            default:
                this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
                break;
        }
    }

    onTouchStart(event) {
        var touchLoc: cc.Vec2 = this.node.convertToNodeSpaceAR(event.getLocation());
        CC_DEBUG && cc.log("GraphicsView satrt point=" + touchLoc);
        this.drawPoint(touchLoc, this.startPointColor);
        this.startPoint = touchLoc;
    }

    onTouchEnd(event) {
        var touchLoc: cc.Vec2 = this.node.convertToNodeSpaceAR(event.getLocation());

        if (this.endPoint == null) {
            this.endPoint = touchLoc;
        } else {
            if (UI.isVec2Equal(touchLoc, this.endPoint)) {
                return;
            }
            this.endPoint = touchLoc;
        }
        CC_DEBUG && cc.log("GraphicsView end point=" + touchLoc);
        this.drawPoint(touchLoc, this.endPointColor);
        this._points.push(touchLoc);

        switch (this._currentIndex) {
            case 0:
                this.dealLine();
                break;
            case 1:
                this.dealRect();
                break;
            case 2:
                this.dealCircle();
                break;
            case 3:
                this.dealEllipse();
                break;
            case 4:
                this.dealArc();
                break;
            case 5:
                this.dealQuadraticCurve();
                break;
            case 6:
                this.dealBezierCurve();
                break;
            default:
                break;
        }
    }

    dealArc() {
        if (this._points.length < 3) return;
        const ponits = this._points.slice(this._points.length - 3, this._points.length);
        //辅助线
        this.drawGuideLine(ponits[0], ponits[1]);
        this.drawGuideLine(ponits[0], ponits[2]);

        //第1个点到第2个点到距离为半径
        const r1 = ponits[0].sub(ponits[1]).mag();
        //第1个点到第3个点到距离为半径
        const r2 = ponits[0].sub(ponits[2]).mag();
        //选小的作为半径
        const r = r1 > r2 ? r2 : r1;
        const sAngle = LineUtils.getXRadian(ponits[0], ponits[1]);
        const eAngle = LineUtils.getXRadian(ponits[0], ponits[2]);
        CC_DEBUG && cc.log("GraphicsView " + sAngle + " " + eAngle);

        CC_DEBUG &&
            cc.log(
                "GraphicsView " +
                    LineUtils.getXAngle(ponits[0], ponits[1]) +
                    " " +
                    LineUtils.getXAngle(ponits[0], ponits[2])
            );
        this.drawArc(ponits[0], r, sAngle, eAngle, false);
    }

    drawArc(
        point: cc.Vec2,
        r: number,
        sAngle: number,
        eAngle: number,
        counterclockwise: boolean,
        lineWidth: number = this.lineWidth,
        lineClolor: cc.Color = this.lineClolor
    ) {
        this.graphics.lineWidth = lineWidth;
        this.graphics.strokeColor = lineClolor;

        this.graphics.arc(point.x, point.y, r, sAngle, eAngle, counterclockwise);
        this.graphics.stroke();
    }

    dealBezierCurve() {
        if (this._points.length < 4) return;
        const ponits = this._points.slice(this._points.length - 4, this._points.length);

        //辅助线
        this.drawGuideLine(ponits[0], ponits[1]);
        this.drawGuideLine(ponits[1], ponits[2]);
        this.drawGuideLine(ponits[2], ponits[3]);

        this.drawBezierCurve(ponits[0], ponits[1], ponits[2], ponits[3]);
    }

    drawBezierCurve(
        point: cc.Vec2,
        point1: cc.Vec2,
        point2: cc.Vec2,
        point3: cc.Vec2,
        lineWidth: number = this.lineWidth,
        lineClolor: cc.Color = this.lineClolor
    ) {
        this.graphics.lineWidth = lineWidth;
        this.graphics.strokeColor = lineClolor;
        this.graphics.moveTo(point.x, point.y);
        this.graphics.bezierCurveTo(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y);
        this.graphics.stroke();
    }

    dealQuadraticCurve() {
        if (this._points.length < 3) return;
        const ponits = this._points.slice(this._points.length - 3, this._points.length);

        //辅助线
        this.drawGuideLine(ponits[0], ponits[1]);
        this.drawGuideLine(ponits[1], ponits[2]);

        this.drawQuadraticCurve(ponits[0], ponits[1], ponits[2]);
    }

    drawQuadraticCurve(
        point: cc.Vec2,
        point1: cc.Vec2,
        point2: cc.Vec2,
        lineWidth: number = this.lineWidth,
        lineClolor: cc.Color = this.lineClolor
    ) {
        this.graphics.lineWidth = lineWidth;
        this.graphics.strokeColor = lineClolor;
        this.graphics.moveTo(point.x, point.y);
        this.graphics.quadraticCurveTo(point1.x, point1.y, point2.x, point2.y);
        this.graphics.stroke();
    }

    //画椭圆,第一个点为椭圆中心,第二个点横坐标为x半径，第三个点的y距离作为y半径
    dealEllipse() {
        if (this._points.length < 3) return;
        const ponits = this._points.slice(this._points.length - 3, this._points.length);

        const x = Math.abs(ponits[1].x - ponits[0].x);
        const y = Math.abs(ponits[2].y - ponits[0].y);

        //辅助线
        this.drawGuideLine(ponits[0], new cc.Vec2(ponits[1].x, ponits[0].y));
        this.drawGuideLine(ponits[1], new cc.Vec2(ponits[1].x, ponits[0].y));
        this.drawGuideLine(ponits[0], new cc.Vec2(ponits[0].x, ponits[2].y));
        this.drawGuideLine(ponits[2], new cc.Vec2(ponits[0].x, ponits[2].y));

        this.drawEllipse(ponits[0], x, y);
    }

    drawEllipse(
        point: cc.Vec2,
        x: number,
        y: number,
        lineWidth: number = this.lineWidth,
        lineClolor: cc.Color = this.lineClolor
    ) {
        this.graphics.lineWidth = lineWidth;
        this.graphics.strokeColor = lineClolor;
        this.graphics.ellipse(point.x, point.y, x, y);
        this.graphics.stroke();
    }

    //画圆，起点作为圆心，终点距离为半径
    dealCircle() {
        if (UI.isVec2Equal(this.startPoint, this.endPoint)) {
            return;
        }
        //辅助线
        this.drawGuideLine(this.startPoint, this.endPoint);

        const r = this.startPoint.sub(this.endPoint).mag();
        this.drawCircle(this.startPoint, r);
    }

    drawCircle(
        point: cc.Vec2,
        r: number,
        lineWidth: number = this.lineWidth,
        lineClolor: cc.Color = this.lineClolor
    ) {
        this.graphics.lineWidth = lineWidth;
        this.graphics.strokeColor = lineClolor;
        this.graphics.circle(point.x, point.y, r);
        this.graphics.stroke();
    }

    //画矩形，起始点作为对角线
    dealRect() {
        if (UI.isVec2Equal(this.startPoint, this.endPoint)) {
            return;
        }

        //辅助线
        this.drawGuideLine(this.startPoint, this.endPoint);

        let point: cc.Vec2 = null;
        const w = Math.abs(this.endPoint.x - this.startPoint.x);
        const h = Math.abs(this.endPoint.y - this.startPoint.y);

        if (this.endPoint.x > this.startPoint.x) {
            if (this.endPoint.y > this.startPoint.y) {
                point = this.startPoint;
            } else {
                point = cc.v2(this.startPoint.x, this.endPoint.y);
            }
        } else {
            if (this.endPoint.y > this.startPoint.y) {
                point = cc.v2(this.endPoint.x, this.startPoint.y);
            } else {
                point = this.endPoint;
            }
        }
        this.drawRect(point.x, point.y, w, h);
    }

    drawRect(
        x: number,
        y: number,
        w: number,
        h: number,
        lineWidth: number = this.lineWidth,
        lineClolor: cc.Color = this.lineClolor
    ) {
        this.graphics.lineWidth = lineWidth;
        this.graphics.strokeColor = lineClolor;
        this.graphics.rect(x, y, w, h);
        this.graphics.stroke();
    }

    dealLine() {
        if (this._points.length < 2) return;
        const ponits = this._points.slice(this._points.length - 2, this._points.length);
        this.drawLine(ponits[0], ponits[1]);
    }

    /**在pos点处画画半径为6像素的点*/
    drawPoint(pos: cc.Vec2, col: cc.Color = cc.Color.RED): void {
        let r: number = 5;
        this.graphics.circle(pos.x, pos.y, r);
        this.graphics.fillColor = col;
        this.graphics.fill();
    }

    /**
     * 画辅助线
     */
    drawGuideLine(
        p1: cc.Vec2,
        p2: cc.Vec2,
        lineWidth: number = 2,
        lineClolor: cc.Color = cc.Color.BLACK
    ): void {
        this.graphics.lineWidth = lineWidth;
        this.graphics.strokeColor = lineClolor;
        this.graphics.moveTo(p1.x, p1.y);
        this.graphics.lineTo(p2.x, p2.y);
        this.graphics.stroke();
    }
    /**
     * 画一条指定起始点和颜色的直线
     * @param p1 起点
     * @param p2 终点
     * @param col 颜色
     */
    drawLine(
        p1: cc.Vec2,
        p2: cc.Vec2,
        lineWidth: number = this.lineWidth,
        lineClolor: cc.Color = this.lineClolor
    ): void {
        this.graphics.lineWidth = lineWidth;
        this.graphics.strokeColor = lineClolor;
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

            this.drawLine(p1, p2);
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
