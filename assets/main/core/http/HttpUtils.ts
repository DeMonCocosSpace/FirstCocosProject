import FetchHttp from "./FetchHttp";
import HttpsHttp from "./HttpsHttp";
import { IHttp } from "./IHttp";
import XHRHttp from "./XHRHttp";

export const HTTP = cc.Enum({
    FETCH: 0,
    HTTPS: 1,
    XHR: 2,
});
export default class HttpUtils {
    private static mode = 0;

    private static http: IHttp = null;

    public static setMode(mode: number) {
        this.mode = mode;
        this.http = null; //重置
    }

    public static getHttp(): IHttp {
        if (this.http == null) {
            switch (this.mode) {
                case HTTP.HTTPS:
                    this.http = new HttpsHttp();
                    break;
                case HTTP.XHR:
                    this.http = new XHRHttp();
                    break;
                default:
                    this.http = new FetchHttp();
                    break;
            }
        }
        return this.http;
    }
}
