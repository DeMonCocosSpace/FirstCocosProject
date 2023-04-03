declare var CommonDepend: CommonDependInterface;
declare interface CommonDependInterface {
    CocosUtils: import("./assets/main/core/utils/CocosUtils").CocosUtils;
    ResLoader: import("./assets/main/core/bd/ResLoader").ResLoader;
}

declare namespace CommonDepend {
    export var CocosUtils: import("./assets/main/core/utils/CocosUtils").CocosUtils;
    export var ResLoader: import("./assets/main/core/bd/ResLoader").ResLoader;
}
declare interface IBundleResInfo {
    bundleName?: string;
    launchScene?: string;
    launchPrefabPath?: string /** 启动预制体路径 比大小这类游戏用到 */;
    priority: IBundleDesc /** 需要优先加载的资源放到这里 比如：进子游戏前必须要加载的资源 */;
    unpriority: IBundleDesc /** 非优先加载的资源放到这里 比如：进子游戏后，再预加载的资源 */;
    loadOnDemand?: IBundleDesc /** 按需加载的资源放这里 这里的资源根绝自己的需要去加载 开发人员只需要关心加载 不需要关心释放 */;
    config?: IBundleConfig;
}

declare interface IResDescribe {
    bundleName?: string;
    resPath: string;
    type: typeof cc.Asset;
    scriptName?: string;
    spineAnimName?: string;
    spineSkin?: string;
    spineIsLoop?: boolean;
}

type IBundleDesc = {
    [index: string]: TIResDescribe;
};

type TIResDescribe =
    | IResDescribe
    | IResDescribe[]
    | { [index: string]: IResDescribe | TIResDescribe };

declare interface IAudio {
    url: string;
    id: number;
    loop: boolean;
    volume: number;
    /** 持续时间，单位 秒 */
    duration?: number;
    /** 标签 */
    tag?: string;
    /** 播放状态 */
    status?: number;
    /** 停止播放 */
    stop?: () => void;
}

declare interface TWidget {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}

declare interface HttpResult<T extends any> {
    code: number;
    error: string;
    result: T;
}

declare interface HttpError {
    code: number;
    error: any | string;
}

type TProgressCallback = (total: number, current: number) => void;

type TFailed = () => void;
