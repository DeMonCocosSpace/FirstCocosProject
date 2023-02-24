import { IncomingMessage, RequestOptions } from "http";
import { Loading, Toast } from "../../../bundle/common/Script/commpent/UIMgr";
import { https } from "../NpmExport";
import { IHttp } from "./IHttp";

export default class HttpsHttp extends IHttp {
    @Loading.applyLoading
    public get(url: string): Promise<any> {
        const self = this;
        return new Promise<any>((resolve, reject) => {
            const options: RequestOptions = {
                path: self.base_url + url,
                headers: self.header,
            };
            const req = https.get(options, (response: IncomingMessage) => {
                cc.log("get " + url + ": " + response.statusCode);
                let data = "";
                response.on("data", (d) => {
                    return (data += d);
                });
                response.on("end", () => {
                    let json = {};
                    try {
                        json = JSON.parse(data);
                    } catch (error) {
                        cc.log("get JSON.parse: " + error);
                        reject(error);
                    }
                    if (response.statusCode >= 200 && response.statusCode < 300) {
                        cc.log("get resolve: " + JSON.stringify(json));
                        resolve(json);
                    } else {
                        Toast.show(json["error"]);
                        cc.log("get reject: " + JSON.stringify(json));
                        reject(json);
                    }
                });
                response.on("error", (error) => {
                    cc.log("get error: " + error);
                    reject(error);
                });
            });
            req.on("error", (error) => {
                cc.log("get error: " + error);
                reject(error);
            });
            req.end();
        });
    }

    @Loading.applyLoading
    public post(url: string, body: any): Promise<any> {
        const self = this;
        return new Promise<any>((resolve, reject) => {
            const options: RequestOptions = {
                method: "POST",
                path: self.base_url + url,
                headers: self.header,
            };
            const req = https.request(options, (response: IncomingMessage) => {
                cc.log("post " + url + ": " + response.statusCode);
                let data = "";
                response.on("data", (d) => {
                    return (data += d);
                });
                response.on("end", () => {
                    let json = {};
                    try {
                        json = JSON.parse(data);
                    } catch (error) {
                        cc.log("post JSON.parse: " + error);
                        reject(error);
                    }
                    if (response.statusCode >= 200 && response.statusCode < 300) {
                        cc.log("post resolve: " + JSON.stringify(json));
                        resolve(json);
                    } else {
                        Toast.show(json["error"]);
                        cc.log("post reject: " + JSON.stringify(json));
                        reject(json);
                    }
                });
                response.on("error", (error) => {
                    cc.log("post error: " + error);
                    reject(error);
                });
            });
            req.on("error", (error) => {
                cc.log("post error: " + error);
                reject(error);
            });
            req.write(JSON.stringify(body));
            req.end();
        });
    }
}
