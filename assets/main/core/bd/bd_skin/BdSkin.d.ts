declare namespace BdSkin {
    type TSkinType = import("../../conf/SkinType").SkinTypes;

    type TSkinInfo = {
        [index in TSkinType]?: IBundleResInfo;
    };

    type TBundleInfo<T extends IBundleResInfo> = {
        [K in keyof IBundleResInfo]: T[K];
    };

    interface IBundleSkin {
        getCurSkin(): TBundleInfo<IBundleResInfo>;
    }
}
