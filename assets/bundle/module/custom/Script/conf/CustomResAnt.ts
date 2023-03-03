export let CustomResAnt = {
    launchScene: "Custom",
    priority: {
        CustomView: <IResDescribe>{
            resPath: "skin/ant/prefab/CustomView",
            type: cc.Prefab,
        },
        BottomMenuView: <IResDescribe>{
            resPath: "skin/ant/prefab/BottomMenuView",
            type: cc.Prefab,
        },
    },
    unpriority: {
        ProgressVew: <IResDescribe>{
            resPath: "skin/ant/prefab/ProgressView",
            type: cc.Prefab,
        },
    },
};
