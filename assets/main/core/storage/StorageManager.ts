export default class StorageManager {
    private constructor() {}

    private static _instance = null;

    public static getInstance(): StorageManager {
        if (!this._instance) {
            this._instance = new StorageManager();
        }
        return this._instance;
    }

    private prefix = "";

    public initPrefix(prefix: string) {
        this.prefix = prefix;
    }

    public getNumber(key: string, def: number): number {
        try {
            return Number(this.getItem(this.prefix + key, `${def}`));
        } catch (e) {
            cc.error(e);
            return def;
        }
    }

    public setNumber(key: string, value: number) {
        return this.setItem(this.prefix + key, `${value}`);
    }

    public getData(key: string, def: string): string {
        return this.getItem(this.prefix + key, def);
    }

    public setData(key: string, value: string) {
        return this.setItem(this.prefix + key, value);
    }

    public removeData(key: string) {
        return this.removeItem(this.prefix + key);
    }

    public getItem(key: string, def: string = ""): string {
        const result = cc.sys.localStorage.getItem(key);
        if (result == null) {
            return def;
        } else {
            return result;
        }
    }

    public setItem(key: string, value: string) {
        cc.sys.localStorage.setItem(key, value);
    }

    public removeItem(key: string) {
        cc.sys.localStorage.removeItem(key);
    }

    public clear() {
        cc.sys.localStorage.clear();
    }
}
