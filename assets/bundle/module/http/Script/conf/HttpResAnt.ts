export let HttpResAnt = {
    launchScene: "Http",
    priority: {
        HttpView: <IResDescribe>{
            resPath: "skin/ant/prefab/HttpView",
            type: cc.Prefab,
        },
    },
    unpriority: {
        UserItem: <IResDescribe>{
            resPath: "skin/final/prefab/UserItem",
            type: cc.Prefab,
        },
    },
};
