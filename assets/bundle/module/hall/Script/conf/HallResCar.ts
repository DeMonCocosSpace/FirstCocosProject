import { GameType } from "../../../../../main/core/conf/GameType";

export let HallResCar = {
    launchScene: "Hall",
    priority: {
        HallView: <IResDescribe>{
            resPath: "skin/car/prefab/HallView",
            type: cc.Prefab,
        },
        GameNavItem: <IResDescribe>{
            resPath: "skin/car/prefab/GameNavItem",
            type: cc.Prefab,
        },
        GameItem: <IResDescribe>{
            resPath: "skin/car/prefab/GameItem",
            type: cc.Prefab,
        },
        /** 游戏nav norml */
        hallNavNormalBg: <IResDescribe>{
            resPath: "skin/car/texture/tk_hall_navbar_bg_n",
            type: cc.SpriteFrame,
        },

        /** 游戏nav selected */
        hallNavSelectdBg: <IResDescribe>{
            resPath: "skin/car/texture/tk_hall_navbar_bg_s",
            type: cc.SpriteFrame,
        },

        /** 游戏入口icons */
        gameEntranceInfo: {
            default: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_default",
                type: cc.SpriteFrame,
            },
            [GameType.ANDAR_BAHAR]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_andarbahar",
                type: cc.SpriteFrame,
            },
            [GameType.CRICKET_BATTLE]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_bestclub",
                type: cc.SpriteFrame,
            },
            [GameType.BINGO]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_bingo",
                type: cc.SpriteFrame,
            },
            [GameType.BLACK_JACK]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_blackjack",
                type: cc.SpriteFrame,
            },
            [GameType.BTI]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_bti",
                type: cc.SpriteFrame,
            },
            [GameType.PP_SLOTS]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_ppslots",
                type: cc.SpriteFrame,
            },
            [GameType.BUFFALO]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_buffalo",
                type: cc.SpriteFrame,
            },
            [GameType.CACHETA]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_cacheta",
                type: cc.SpriteFrame,
            },
            [GameType.CLASSIC_FIVE_DRAGONS]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_classicfivedragon",
                type: cc.SpriteFrame,
            },
            [GameType.CRASH]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_crash",
                type: cc.SpriteFrame,
            },
            [GameType.BIGBATTLE]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_dxt",
                type: cc.SpriteFrame,
            },
            [GameType.FIRE_JOKER]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_firejoker",
                type: cc.SpriteFrame,
            },
            [GameType.FISHING]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_fish",
                type: cc.SpriteFrame,
            },
            [GameType.DOMINO_GAPLE]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_gaple",
                type: cc.SpriteFrame,
            },
            [GameType.GOD_OF_FORTUNE]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_godoffortune",
                type: cc.SpriteFrame,
            },
            [GameType.LUDO]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_ludo",
                type: cc.SpriteFrame,
            },
            [GameType.BIG_SMALL]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_lxs",
                type: cc.SpriteFrame,
            },
            [GameType.ROULETTE]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_roulette",
                type: cc.SpriteFrame,
            },
            [GameType.REDBLACK]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_rxb",
                type: cc.SpriteFrame,
            },
            [GameType.LUCKY_DICE]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_dadodasorte",
                type: cc.SpriteFrame,
            },
            [GameType.SEVEN_UP_DOWN]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_sevenupdown",
                type: cc.SpriteFrame,
            },
            [GameType.SHARK]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_shark",
                type: cc.SpriteFrame,
            },
            [GameType.TRUCO]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_truco",
                type: cc.SpriteFrame,
            },
            [GameType.WOLF_GOLD]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_wolfgold",
                type: cc.SpriteFrame,
            },
            [GameType.QUICK_LUDO]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_qiuckludo",
                type: cc.SpriteFrame,
            },
            [GameType.BURACO_ABERTO]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_buraco",
                type: cc.SpriteFrame,
            },
            [GameType.CRAZY_GENIE]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_crazygenie",
                type: cc.SpriteFrame,
            },
            [GameType.DOMINO_BANDAR]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_dominobandar",
                type: cc.SpriteFrame,
            },
            [GameType.SICBO_CLASSIC]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_sicboclassic",
                type: cc.SpriteFrame,
            },
            [GameType.WEALTH]: {
                resPath: "skin/car/texture/frame/entrance/tk_hall_game_btn_wealth",
                type: cc.SpriteFrame,
            },
        },
        gameTag: {
            0: {
                resPath: "skin/car/texture/frame/gameTag/tk_hall_game_img_hot",
                type: cc.SpriteFrame,
            },
            1: {
                resPath: "skin/car/texture/frame/gameTag/tk_hall_game_img_new",
                type: cc.SpriteFrame,
            },
            2: {
                resPath: "skin/car/texture/frame/gameTag/tk_hall_game_img_rich",
                type: cc.SpriteFrame,
            },
            3: {
                resPath: "skin/car/texture/frame/gameTag/tk_hall_game_img_hd",
                type: cc.SpriteFrame,
            },
        },
    },
    unpriority: {
        VolumeSettingView: <IResDescribe>{
            resPath: "skin/car/prefab/VolumeSettingView",
            type: cc.Prefab,
        },
        HallBgm: <IResDescribe>{
            resPath: "skin/car/audio/hall_bg",
            type: cc.AudioClip,
        },
        newbie_bonus: <IResDescribe>{
            resPath: "skin/car/audio/newbie_bonus",
            type: cc.AudioClip,
        },
        online_bonus: <IResDescribe>{
            resPath: "skin/car/audio/online_bonus",
            type: cc.AudioClip,
        },
    },
};
