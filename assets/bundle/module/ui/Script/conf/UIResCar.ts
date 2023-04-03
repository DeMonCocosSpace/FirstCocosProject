export let UIResCar = {
    launchScene: "UI",
    priority: {
        UIView: <IResDescribe>{
            resPath: "skin/car/prefab/UIView",
            type: cc.Prefab,
        },
        BottomMenuView: <IResDescribe>{
            resPath: "skin/car/prefab/BottomMenuView",
            type: cc.Prefab,
        },
        GraphicsView: <IResDescribe>{
            resPath: "skin/final/prefab/GraphicsView",
            type: cc.Prefab,
        },
    },
    unpriority: {
        ProgressVew: <IResDescribe>{
            resPath: "skin/car/prefab/ProgressView",
            type: cc.Prefab,
        },
    },
};
