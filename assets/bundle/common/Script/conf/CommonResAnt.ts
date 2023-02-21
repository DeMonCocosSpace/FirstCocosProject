export let CommonResAnt = {
    priority: {
        bgSkin: <IResDescribe>{
            resPath: "skin/ant/texture/bg",
            type: cc.SpriteFrame,
        },
        btnSkin: <IResDescribe>{
            resPath: "skin/ant/texture/btn",
            type: cc.SpriteFrame,
        },
        AlertView: <IResDescribe>{
            resPath: "skin/ant/prefab/AlertView",
            type: cc.Prefab,
        },
        LoadingView: <IResDescribe>{
            resPath: "skin/ant/prefab/LoadingView",
            type: cc.Prefab,
        },
        ToastView: <IResDescribe>{
            resPath: "skin/ant/prefab/toast/ToastView",
            type: cc.Prefab,
        },
    },
    unpriority: {},
    loadOnDemand: {
        btnEffect: <IResDescribe>{
            resPath: "skin/final/audio/btn_click",
            type: cc.AudioClip,
        },
    },
};
