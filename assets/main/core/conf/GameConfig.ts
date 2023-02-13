import { GameType } from "./GameType";

const GameConfig = [
    {
        name: "All",
        game_ids: [
            GameType.FIRE_JOKER,
            GameType.BUFFALO,
            GameType.WOLF_GOLD,
            GameType.CLASSIC_FIVE_DRAGONS,
            GameType.GOD_OF_FORTUNE,
            GameType.WEALTH,
            GameType.CRAZY_GENIE,

            GameType.BIGBATTLE,
            GameType.REDBLACK,
            GameType.BIG_SMALL,
            GameType.SEVEN_UP_DOWN,
            GameType.CRASH,
            GameType.BEST_OFFIVE, //万人金花
            GameType.CRICKET_BATTLE, // 板球大战
            GameType.THREE_DICE, //judidadu
            GameType.ANDAR_BAHAR, //Andar Bahar
            GameType.JHANDI_MUNDA, //Jhandi Munda
            GameType.ROULETTE, //轮盘
            GameType.LUCKY_DICE,
            GameType.DOMINO_BANDAR, //domino bandar
            GameType.SICBO_CLASSIC, //sicbo classic
            GameType.BANDAR_QIUQIU, //bandar qiuqiu

            GameType.RUMMY_POINT,
            GameType.TEENPATTI,
            GameType.TRUCO,
            GameType.LUDO, //LUDO
            GameType.CACHETA, //Cacheta
            GameType.CALL_BREAK, //Call Break
            GameType.BINGO, //bingo
            GameType.BLACK_JACK, //blackjack
            GameType.DOMINO_GAPLE, //Domino-Gaple
            GameType.QUICK_LUDO, //Quick Ludo
            GameType.DOMINO_QIUQIU,
            GameType.POOL_RUMMY, // Pool Rummy
            GameType.CEME, // ceme
            GameType.REMI, // REMI
            GameType.BURACO_ABERTO,

            GameType.FISHING,

            GameType.BTI, //BTI Sports
            GameType.PP_SLOTS,
        ],
    },
    {
        name: "Hot",
        game_ids: [
            GameType.FIRE_JOKER,
            GameType.BUFFALO,
            GameType.WOLF_GOLD,
            GameType.CLASSIC_FIVE_DRAGONS,
            GameType.GOD_OF_FORTUNE,
            GameType.WEALTH,
            GameType.CRAZY_GENIE,
        ],
    },
    {
        name: "Slot",
        game_ids: [
            GameType.CRICKET_BATTLE, // 板球大战
            GameType.THREE_DICE, //judidadu
            GameType.ANDAR_BAHAR, //Andar Bahar
            GameType.JHANDI_MUNDA, //Jhandi Munda
            GameType.ROULETTE, //轮盘
            GameType.LUCKY_DICE,
            GameType.DOMINO_BANDAR, //domino bandar
            GameType.SICBO_CLASSIC, //sicbo classic
            GameType.BANDAR_QIUQIU, //bandar qiuqi
        ],
    },
    {
        name: "Poker",
        game_ids: [
            GameType.BIGBATTLE,
            GameType.REDBLACK,
            GameType.BIG_SMALL,
            GameType.SEVEN_UP_DOWN,
            GameType.CRASH,
            GameType.BEST_OFFIVE, //万人金花
        ],
    },
    {
        name: "Sport",
        game_ids: [
            GameType.RUMMY_POINT,
            GameType.TEENPATTI,
            GameType.TRUCO,
            GameType.LUDO, //LUDO
            GameType.CACHETA, //Cacheta
            GameType.CALL_BREAK, //Call Break
            GameType.BINGO, //bingo
            GameType.BLACK_JACK, //blackjack
            GameType.DOMINO_GAPLE, //Domino-Gaple
            GameType.QUICK_LUDO, //Quick Ludo
            GameType.DOMINO_QIUQIU,
            GameType.POOL_RUMMY, // Pool Rummy
            GameType.CEME, // ceme
            GameType.REMI, // REMI
            GameType.BURACO_ABERTO,
        ],
    },
    {
        name: "Other",
        game_ids: [
            GameType.FISHING,

            GameType.BTI, //BTI Sports
            GameType.PP_SLOTS,
        ],
    },
    {
        name: "Favorite",
        game_ids: [],
    },
];

export default GameConfig;
