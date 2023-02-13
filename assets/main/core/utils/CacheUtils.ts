const DEFALUT_NAVITEM_INDEX = 0;
export default class CacheUtils {
    public setNavItemIndex(index: number) {
        this.navItemIndex = index;
    }

    public getNavItemIndex(): number {
        return this.navItemIndex;
    }

    public initDataCache() {
        this.setNavItemIndex(DEFALUT_NAVITEM_INDEX);
    }
    private constructor() {}

    private static _instance = null;

    public static getInstance(): CacheUtils {
        if (!this._instance) {
            this._instance = new CacheUtils();
        }
        return this._instance;
    }

    /** 记录大厅导航item索引 默认为"0"*/
    private navItemIndex: number = DEFALUT_NAVITEM_INDEX;
}
