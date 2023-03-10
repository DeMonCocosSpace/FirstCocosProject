export let CustomResCar = {
    launchScene: "Custom",
    priority: {
        CustomView: <IResDescribe>{
            resPath: "skin/car/prefab/CustomView",
            type: cc.Prefab,
        },
        BottomMenuView: <IResDescribe>{
            resPath: "skin/car/prefab/BottomMenuView",
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
