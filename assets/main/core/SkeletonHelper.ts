import { ResLoader } from "./bd/ResLoader";

type EventCallfunc = (trackEntry: sp.spine.TrackEntry, event: cc.Event) => void;
type EventListener = {
    callfunc: EventCallfunc;
    target?: any;
    once: boolean;
};

type TCreateInParentOptions = Partial<{
    position: cc.Vec3;
}>;
export default class SkeletonHelper {
    public static createInParent(parent: cc.Node, options?: TCreateInParentOptions) {
        let skeletonNode = new cc.Node("skeletonNode");
        skeletonNode.parent = parent;
        if (options && options.position) {
            skeletonNode.position = options.position;
        }
        let skeleton: sp.Skeleton = skeletonNode.addComponent(sp.Skeleton);

        return new SkeletonHelper(skeleton);
    }
    public static create(skeleton: sp.Skeleton) {
        return new SkeletonHelper(skeleton);
    }

    private _eventListeners: { [eventName: string]: EventListener[] } = {};

    constructor(private _skeleton: sp.Skeleton) {
        this._skeleton.setEventListener(this.onSkeletonEvent.bind(this));
    }

    public destroy() {
        this._skeleton?.node?.destroy();
    }
    public getNode() {
        return this._skeleton.node;
    }

    public setData(data: sp.SkeletonData) {
        this._skeleton.skeletonData = data;
    }

    public load(res: IResDescribe) {
        return ResLoader.getInstance()
            .loadResFromBundle<sp.SkeletonData>(res)
            .then((data) => {
                if (data) {
                    if (cc.isValid(this._skeleton)) {
                        this._skeleton.skeletonData = data;
                    }
                }
            });
    }
    public hasAnimation(animName: string) {
        if (!this.getAnimationNames().includes(animName)) {
            return false;
        }
        return true;
    }

    public getAnimations(): { [animName: string]: any } {
        return this._skeleton.skeletonData?.skeletonJson?.animations ?? {};
    }

    public getAnimationNames(): string[] {
        return Object.keys(this.getAnimations());
    }

    public async tryPlay(
        animName?: string,
        options?: {
            loop?: boolean;
            //动画起始百分比0-1  1会保留播放最后一帧
            begin?: number;
        }
    ) {
        if (!this.hasAnimation(animName)) {
            return;
        }

        return this.play(animName, options);
    }

    public play(
        animName?: string,
        options?: {
            loop?: boolean;
            //动画起始百分比0-1  1会保留播放最后一帧
            begin?: number;
            timeScale?: number;
        }
    ) {
        return new Promise((resolve) => {
            this._skeleton.setCompleteListener(() => {
                resolve(true);
            });
            const animation =
                animName ?? this._skeleton.getState()?.data?.animations?.[0]?.name ?? "";

            if (!animation) {
                if (CC_DEBUG) {
                    CC_DEBUG && cc.warn("SkeletonHelper play animation Name is Empty!");
                }
            }

            if (!this.hasAnimation(animation)) {
                CC_DEBUG &&
                    cc.warn(
                        `SkeletonHelper play animation not find animName:${animation}!, skeletonData:${this._skeleton.skeletonData.name}`
                    );
                resolve(false);
                return;
            }

            let trackEntry: sp.spine.TrackEntry = this._skeleton.setAnimation(
                0,
                animation,
                options?.loop ?? false
            );
            if (!trackEntry) {
                CC_DEBUG && cc.warn("SkeletonHelper play animation Name failed!");
                resolve(false);
                return;
            }
            trackEntry.animationStart = trackEntry.animationEnd * (options?.begin ?? 0);
            this._skeleton.paused = false;
            this._skeleton.timeScale = options?.timeScale ?? 1;
        });
    }

    public pause(
        animName?: string,
        options?: {
            //动画起始百分比0-1  1会保留播放最后一帧
            begin?: number;
        }
    ) {
        this.play(animName, options);
        this._skeleton.paused = true;
    }

    public onBonePos(boneName: string, callfunc: (position: cc.Vec3) => void) {
        const boneNodes = this.getBones(boneName);
        // 取第一个骨骼作为挂点
        let boneNode = boneNodes[0];
        boneNode.on(cc.Node.EventType.POSITION_CHANGED, () => {
            callfunc(boneNode.convertToWorldSpaceAR(cc.v3()));
        });
    }

    public addBone(boneName: string, node: cc.Node): void {
        const boneNodes = this.getBones(boneName);
        // 取第一个骨骼作为挂点
        let boneNode = boneNodes[0];

        node.parent = boneNode;
    }

    public getBones(boneName: string): cc.Node[] {
        const attachUtil: sp.sp.AttachUtil = this._skeleton["attachUtil"];
        attachUtil.generateAttachedNodes(boneName);
        const boneNodes = attachUtil.getAttachedNodes(boneName);

        return boneNodes;
    }

    public getBoneWorldPos(boneName: string): cc.Vec3 {
        const boneNodes = this.getBones(boneName);
        let boneNode: cc.Node = boneNodes[0];
        if (!boneNode) {
            CC_DEBUG && cc.error("boneNode is null");
            return cc.v3(0, 0, 0);
        }
        return boneNode.convertToWorldSpaceAR(cc.v3(0, 0, 0));
    }

    public getCurAnimationName() {
        return this._skeleton.animation;
    }

    public onEvent(
        eventName: string,
        callfunc: EventCallfunc,
        target?: any,
        once: boolean = true
    ): void {
        const eventListener =
            this._eventListeners[eventName] || (this._eventListeners[eventName] = []);

        eventListener.push({
            callfunc,
            target,
            once,
        });
    }

    private onSkeletonEvent(trackEntry: sp.spine.TrackEntry, event: sp.spine.Event): void {
        const eventName = event.data.name;
        const eventListners = this._eventListeners[eventName];
        if (!eventListners) {
            return;
        }

        for (let i = eventListners.length - 1; i >= 0; i--) {
            const eventListner = eventListners[i];

            eventListner.callfunc.call(eventListner.target, trackEntry, event);

            if (eventListner.once) {
                eventListners.splice(i, 1);
            }
        }
    }
}
