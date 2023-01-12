export default class BundleCenter {
    private constructor() {}

    private static _instance = null;

    public static getInstance(): BundleCenter {
        if (!this._instance) {
            this._instance = new BundleCenter();
            return this._instance;
        }
    }
}
