import { Loading, Toast } from "../../../bundle/common/Script/commpent/UIMgr";
import { IHttp } from "./IHttp";

export default class extends IHttp {
    private xhr: XMLHttpRequest = null;

    @Loading.applyLoading
    public get(url: string): Promise<any> {
        if (this.xhr == null) {
            this.xhr = new XMLHttpRequest();
        }
        const self = this;
        return new Promise((resolve, reject) => {
            self.xhr.open("GET", self.base_url + url, true);
            self.xhr.onreadystatechange = () => {
                if (self.xhr.readyState === 4) {
                    cc.log("get " + url + ": status=" + self.xhr.status);
                    const json = self.xhr.response;
                    if (self.xhr.status >= 200 && self.xhr.status < 300) {
                        cc.log("get " + url + ": resolve=" + JSON.stringify(json));
                        resolve(json);
                    } else {
                        Toast.show(json["error"]);
                        cc.log("get " + url + ": reject=" + JSON.stringify(json));
                        reject(json);
                    }
                }
            };
            self.xhr.ontimeout = (event) => {
                cc.log("get " + url + ": ontimeout");
                reject("ontimeout");
            };
            self.xhr.onerror = (event) => {
                cc.log("get " + url + ": onerror");
                reject("onerror");
            };

            self.xhr.setRequestHeader("X-LC-Id", self.header["X-LC-Id"]);
            self.xhr.setRequestHeader("X-LC-Key", self.header["X-LC-Key"]);
            self.xhr.setRequestHeader("content-type", self.header["Content-Type"]);
            self.xhr.responseType = "json";
            //self.xhr.timeout = 3000;
            self.xhr.send();
        });
    }

    @Loading.applyLoading
    public post(url: string, body: any): Promise<any> {
        if (this.xhr == null) {
            this.xhr = new XMLHttpRequest();
        }
        const self = this;
        return new Promise((resolve, reject) => {
            self.xhr.open("POST", self.base_url + url, true);
            self.xhr.onreadystatechange = () => {
                if (self.xhr.readyState === 4) {
                    cc.log("post " + url + ": status=" + self.xhr.status);
                    const json = self.xhr.response;
                    if (self.xhr.status >= 200 && self.xhr.status < 300) {
                        cc.log("post " + url + ": resolve=" + JSON.stringify(json));
                        resolve(json);
                    } else {
                        Toast.show(json["error"]);
                        cc.log("post " + url + ": reject=" + JSON.stringify(json));
                        reject(json);
                    }
                }
            };
            self.xhr.ontimeout = (event) => {
                cc.log("post " + url + ": ontimeout");
                reject("ontimeout");
            };
            self.xhr.onerror = (event) => {
                cc.log("post " + url + ": onerror");
                reject("onerror");
            };

            self.xhr.setRequestHeader("X-LC-Id", self.header["X-LC-Id"]);
            self.xhr.setRequestHeader("X-LC-Key", self.header["X-LC-Key"]);
            self.xhr.setRequestHeader("content-type", self.header["Content-Type"]);
            self.xhr.responseType = "json";
            //self.xhr.timeout = 3000;
            self.xhr.send(JSON.stringify(body));
        });
    }
}
