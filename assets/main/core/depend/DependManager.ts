import { ResLoader } from "../bd/ResLoader";
import { CocosUtils } from "../utils/CocosUtils";

export class DependManager {
    private constructor() {}

    private static _instance = null;

    public static getInstance(): DependManager {
        if (!this._instance) {
            this._instance = new DependManager();
        }
        return this._instance;
    }

    public init() {
        let depend: CommonDependInterface = {
            CocosUtils: CocosUtils.getInstance(),
            ResLoader: ResLoader.getInstance(),
        };
        CommonDepend = depend;
    }
}
