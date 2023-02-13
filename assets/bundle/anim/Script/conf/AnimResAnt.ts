export let AnimResAnt = {
    launchScene: "Anim",
    priority: {
        AnimBtnView: <IResDescribe>{
            resPath: "skin/ant/prefab/AnimBtnView",
            type: cc.Prefab,
        },
    },
    unpriority: {
        AnimDialogView: <IResDescribe>{
            resPath: "skin/ant/prefab/AnimDialogView",
            type: cc.Prefab,
        },
        FrameView: <IResDescribe>{
            resPath: "skin/final/prefab/FrameView",
            type: cc.Prefab,
        },
        MonsterView: <IResDescribe>{
            resPath: "skin/final/prefab/MonsterView",
            type: cc.Prefab,
        },
    },
};
