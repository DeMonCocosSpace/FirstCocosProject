import PopUpViewBase from "../../../../main/core/ui/popup/PopUpViewBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MonsterView extends PopUpViewBase {
    @property(cc.Node)
    monster: cc.Node = null;

    @property(cc.Integer)
    speed = 0;

    private anim: cc.Animation = null;

    private runaction: cc.Action = null;

    private tweenAction: cc.Tween = null;

    onLoad() {
        this.hasBack = true;
        this.anim = this.monster.getComponent(cc.Animation);
        this.node.on(cc.Node.EventType.TOUCH_START, this.getPos, this);
    }

    getPos(event: cc.Touch) {
        const pos = this.node.convertToNodeSpaceAR(event.getLocation());
        const start = this.monster.getPosition();

        //this.playAnim(start, pos);
        //this.actionMove(start, pos);
        this.tweenMove(start, pos);
    }

    //根据两点播放对应的动画
    playAnim(start, end) {
        const angle = this.getAngle(start, end);

        //this.monster.angle = angle;

        const dir = this.getDirection(angle);
        cc.log("dir=" + dir);
        const animClip: cc.AnimationClip = this.anim.getClips()[dir];
        cc.log(animClip.name);
        if (this.anim.currentClip == null || this.anim.currentClip.name != animClip.name) {
            this.anim.play(animClip.name);
        }
    }

    //缓动系统移动
    tweenMove(start, end) {
        const time = this.getDistance(start, end) / this.speed;
        //开始下一次移动前，停止上次移动
        if ((this.tweenAction! = null)) {
            this.tweenAction.stop();
        }
        this.tweenAction = cc
            .tween(this.monster)
            .call(() => {
                console.log("tweenMove Start");
                this.playAnim(start, end);
            }, this)
            //.then(cc.tween().to(1, { scale: 1.2 }))
            .then(cc.tween().to(time, { position: end }, { easing: "smooth" }))
            //.then(cc.tween().to(1, { scale: 1 }))
            .call(() => {
                console.log("tweenMove Finish");
                //this.anim.stop();
            }, this);
        this.tweenAction.start();
    }

    //动作系统移动
    actionMove(start, end) {
        //开始下一次移动前，停止上次移动
        if ((this.runaction! = null)) {
            this.monster.stopAction(this.runaction);
        }
        const time = this.getDistance(start, end) / this.speed;
        //移动停止时，停止动作动画
        const actionFinish = cc.callFunc(function () {
            console.log("actionFinish");
            this.anim.stop();
        }, this);
        //模拟队列:放大，移动，缩小，结束回调
        this.runaction = cc.sequence(
            cc.scaleTo(1, 1.2, 1.2),
            cc.moveTo(time, end),
            cc.scaleTo(1, 1, 1),
            actionFinish
        );
        this.monster.runAction(this.runaction);
    }

    //获取两点间的距离
    getDistance(start, end) {
        let distance = start.sub(end).mag();
        return distance;
    }

    //根据角度判断方向
    getDirection(angle: number) {
        cc.log("getDirection=" + angle);
        if (angle >= 45 && angle < 135) {
            return 0;
        } else if (angle >= -45 && angle < 45) {
            return 1;
        } else if (angle >= -135 && angle < -45) {
            return 2;
        } else {
            return 3;
        }
    }
    // 计算两点间的角度:欧拉角
    getAngle(start, end) {
        //计算出朝向
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const dir = cc.v2(dx, dy);

        //根据朝向计算出夹角弧度
        const angle = dir.signAngle(cc.v2(1, 0));

        //将弧度转换为欧拉角
        const degree = (angle / Math.PI) * 180;

        return -degree;
    }

    // update (dt) {}
}
