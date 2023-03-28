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
        paopao: <IResDescribe>{
            resPath: "skin/ant/texture/paopao",
            type: cc.SpriteFrame,
        },
        flower: <IResDescribe>{
            resPath: "skin/ant/texture/snow",
            type: cc.SpriteFrame,
        },
    },
    unpriority: {
        ProgressVew: <IResDescribe>{
            resPath: "skin/ant/prefab/ProgressView",
            type: cc.Prefab,
        },
    },
};
