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
        paopao: <IResDescribe>{
            resPath: "skin/car/texture/paopao",
            type: cc.SpriteFrame,
        },
        flower: <IResDescribe>{
            resPath: "skin/car/texture/flower",
            type: cc.SpriteFrame,
        },
    },
    unpriority: {
        ProgressVew: <IResDescribe>{
            resPath: "skin/car/prefab/ProgressView",
            type: cc.Prefab,
        },
    },
};
