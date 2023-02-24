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

    public static setMode(mode: number) {
        this.mode = mode;
    }

    public static getHttp(): IHttp {
        let http: IHttp = null;
        switch (this.mode) {
            case HTTP.HTTPS:
                http = new HttpsHttp();
                break;
            case HTTP.XHR:
                http = new XHRHttp();
                break;
            default:
                http = new FetchHttp();
                break;
        }
        return http;
    }
}
