import { GameType } from "../../../../main/core/conf/GameType";

export let HallResAnt = {
    launchScene: "Hall",
    priority: {
        HallView: <IResDescribe>{
            resPath: "skin/ant/prefab/HallView",
            type: cc.Prefab,
        },
        GameNavItem: <IResDescribe>{
            resPath: "skin/ant/prefab/GameNavItem",
            type: cc.Prefab,
        },
        GameItem: <IResDescribe>{
            resPath: "skin/ant/prefab/GameItem",
            type: cc.Prefab,
        },
        /** 游戏nav norml */
        hallNavNormalBg: <IResDescribe>{
            resPath: "skin/ant/texture/lt_hall_navbar_bg_n",
            type: cc.SpriteFrame,
        },

        /** 游戏nav selected */
        hallNavSelectdBg: <IResDescribe>{
            resPath: "skin/ant/texture/lt_hall_navbar_bg_s",
            type: cc.SpriteFrame,
        },

        /** 游戏入口icons */
        gameEntranceInfo: {
            default: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_default",
                type: cc.SpriteFrame,
            },
            [GameType.CLASSIC_FIVE_DRAGONS]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_5dragons",
                type: cc.SpriteFrame,
            },
            [GameType.SEVEN_UP_DOWN]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_7updown",
                type: cc.SpriteFrame,
            },
            [GameType.ANDAR_BAHAR]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_andarbahar",
                type: cc.SpriteFrame,
            },
            [GameType.BLACK_JACK]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_blackjack",
                type: cc.SpriteFrame,
            },
            [GameType.BTI]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_bti",
                type: cc.SpriteFrame,
            },
            [GameType.BUFFALO]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_bull",
                type: cc.SpriteFrame,
            },
            [GameType.CALL_BREAK]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_callbreak",
                type: cc.SpriteFrame,
            },
            [GameType.CRASH]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_crash",
                type: cc.SpriteFrame,
            },
            [GameType.CRICKET_BATTLE]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_cricket",
                type: cc.SpriteFrame,
            },
            [GameType.BIGBATTLE]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_dvst",
                type: cc.SpriteFrame,
            },
            [GameType.WOLF_GOLD]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_egypt",
                type: cc.SpriteFrame,
            },
            [GameType.FISHING]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_fish",
                type: cc.SpriteFrame,
            },
            [GameType.DOMINO_GAPLE]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_gaple",
                type: cc.SpriteFrame,
            },
            [GameType.GOD_OF_FORTUNE]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_god",
                type: cc.SpriteFrame,
            },
            [GameType.BINGO]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_god_bingo",
                type: cc.SpriteFrame,
            },
            [GameType.BEST_OFFIVE]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_goldflower",
                type: cc.SpriteFrame,
            },
            [GameType.JHANDI_MUNDA]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_jhandimunda",
                type: cc.SpriteFrame,
            },
            [GameType.THREE_DICE]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_judidadu",
                type: cc.SpriteFrame,
            },
            [GameType.LUDO]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_ludo",
                type: cc.SpriteFrame,
            },
            [GameType.FIRE_JOKER]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_phenix",
                type: cc.SpriteFrame,
            },
            [GameType.ROULETTE]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_roulette",
                type: cc.SpriteFrame,
            },
            [GameType.RUMMY_POINT]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_rummy",
                type: cc.SpriteFrame,
            },
            [GameType.REDBLACK]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_rvsb",
                type: cc.SpriteFrame,
            },
            [GameType.BIG_SMALL]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_sicbo",
                type: cc.SpriteFrame,
            },
            [GameType.TEENPATTI]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_teenpatti",
                type: cc.SpriteFrame,
            },
            [GameType.QUICK_LUDO]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_quickludo",
                type: cc.SpriteFrame,
            },
            [GameType.POOL_RUMMY]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_poolrummy",
                type: cc.SpriteFrame,
            },
            [GameType.DOMINO_QIUQIU]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_dominoqiuqiu",
                type: cc.SpriteFrame,
            },
            [GameType.WEALTH]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_wealth",
                type: cc.SpriteFrame,
            },
            [GameType.SICBO_CLASSIC]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_sicboclassic",
                type: cc.SpriteFrame,
            },
            [GameType.PP_SLOTS]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_ppslots",
                type: cc.SpriteFrame,
            },
            [GameType.DOMINO_BANDAR]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_dominobandar",
                type: cc.SpriteFrame,
            },
            [GameType.CRAZY_GENIE]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_crazygenie",
                type: cc.SpriteFrame,
            },
            [GameType.BANDAR_QIUQIU]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_bandarqiuqiu",
                type: cc.SpriteFrame,
            },
            [GameType.CEME]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_ceme",
                type: cc.SpriteFrame,
            },
            [GameType.REMI]: {
                resPath: "skin/ant/texture/frame/entrance/hall_game_btn_remi",
                type: cc.SpriteFrame,
            },
        },

        gameTag: {
            0: {
                resPath: "skin/ant/texture/frame/gameTag/lt_hall_game_img_hot",
                type: cc.SpriteFrame,
            },
            1: {
                resPath: "skin/ant/texture/frame/gameTag/lt_hall_game_img_new",
                type: cc.SpriteFrame,
            },
            2: {
                resPath: "skin/ant/texture/frame/gameTag/lt_hall_game_img_rich",
                type: cc.SpriteFrame,
            },
            3: {
                resPath: "skin/ant/texture/frame/gameTag/lt_hall_game_img_hd",
                type: cc.SpriteFrame,
            },
        },
    },
    unpriority: {
        VolumeSettingView: <IResDescribe>{
            resPath: "skin/ant/prefab/VolumeSettingView",
            type: cc.Prefab,
        },
        HallBgm: <IResDescribe>{
            resPath: "skin/ant/audio/hall_bg",
            type: cc.AudioClip,
        },
        newbie_bonus: <IResDescribe>{
            resPath: "skin/ant/audio/newbie_bonus",
            type: cc.AudioClip,
        },
        online_bonus: <IResDescribe>{
            resPath: "skin/ant/audio/online_bonus",
            type: cc.AudioClip,
        },
    },
};
