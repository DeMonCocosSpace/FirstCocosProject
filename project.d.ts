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

type TProgressCallback = (total: number, current: number) => void;

type TFailed = () => void;
