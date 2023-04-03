export let UIResAnt = {
    launchScene: "UI",
    priority: {
        UIView: <IResDescribe>{
            resPath: "skin/ant/prefab/UIView",
            type: cc.Prefab,
        },
        BottomMenuView: <IResDescribe>{
            resPath: "skin/ant/prefab/BottomMenuView",
            type: cc.Prefab,
        },
        GraphicsView: <IResDescribe>{
            resPath: "skin/final/prefab/GraphicsView",
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
