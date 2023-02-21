export let CommonResCar = {
    priority: {
        bgSkin: <IResDescribe>{
            resPath: "skin/car/texture/bg",
            type: cc.SpriteFrame,
        },
        btnSkin: <IResDescribe>{
            resPath: "skin/car/texture/button",
            type: cc.SpriteFrame,
        },
        AlertView: <IResDescribe>{
            resPath: "skin/car/prefab/AlertView",
            type: cc.Prefab,
        },
        LoadingView: <IResDescribe>{
            resPath: "skin/car/prefab/LoadingView",
            type: cc.Prefab,
        },
        ToastView: <IResDescribe>{
            resPath: "skin/car/prefab/toast/ToastView",
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
