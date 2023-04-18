export namespace LineUtils {
    //两个点计算与X轴正方向的夹角
    export function getXAngle(point1: cc.Vec2, point2: cc.Vec2) {
        //const k = Math.abs((point2.y - point1.y) / (point2.x - point1.x));
        const angle = (Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180) / Math.PI;
        return angle > 0 ? angle : 360 + angle;
    }

    //两个点计算与X轴正方向的弧度
    export function getXRadian(point1: cc.Vec2, point2: cc.Vec2) {
        return (getXAngle(point1, point2) / 180) * Math.PI;
    }
}
