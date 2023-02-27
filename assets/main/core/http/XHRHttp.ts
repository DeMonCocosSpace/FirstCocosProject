import { Loading, Toast } from "../../../bundle/common/Script/commpent/UIMgr";
import { ApiErrorCode, IHttp } from "./IHttp";

export default class XHRHttp extends IHttp {
    private xhr: XMLHttpRequest = null;

    @Loading.applyLoading
    public get<T extends any>(url: string): Promise<T> {
        if (this.xhr == null) {
            this.xhr = new XMLHttpRequest();
        }
        const self = this;
        return new Promise<T>((resolve, reject) => {
            self.xhr.open("GET", self.base_url + url, true);
            self.xhr.onreadystatechange = () => {
                if (self.xhr.readyState === 4) {
                    cc.log("get " + url + ": status=" + self.xhr.status);
                    const json = self.xhr.response;
                    if (self.xhr.status >= 200 && self.xhr.status < 300) {
                        cc.log("get " + url + ": resolve=" + JSON.stringify(json));
                        resolve(json);
                    } else {
                        const httpError: HttpError = json;
                        Toast.show(httpError.error);
                        cc.log("get reject: " + JSON.stringify(json));
                        reject(httpError);
                    }
                }
            };
            self.xhr.ontimeout = (event) => {
                cc.log("get " + url + ": ontimeout");
                const httpError: HttpError = {
                    code: ApiErrorCode.TIMEOUT,
                    error: "ontimeout",
                };
                reject(httpError);
            };
            self.xhr.onerror = (event) => {
                cc.log("get " + url + ": onerror");
                const httpError: HttpError = {
                    code: ApiErrorCode.HTTP_ERROR,
                    error: "onerror",
                };
                reject(httpError);
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
    public post<T extends any>(url: string, body: any): Promise<T> {
        if (this.xhr == null) {
            this.xhr = new XMLHttpRequest();
        }
        const self = this;
        return new Promise<T>((resolve, reject) => {
            self.xhr.open("POST", self.base_url + url, true);
            self.xhr.onreadystatechange = () => {
                if (self.xhr.readyState === 4) {
                    cc.log("post " + url + ": status=" + self.xhr.status);
                    const json = self.xhr.response;
                    if (self.xhr.status >= 200 && self.xhr.status < 300) {
                        cc.log("post " + url + ": resolve=" + JSON.stringify(json));
                        resolve(json);
                    } else {
                        const httpError: HttpError = json;
                        Toast.show(httpError.error);
                        cc.log("post reject: " + JSON.stringify(json));
                        reject(httpError);
                    }
                }
            };
            self.xhr.ontimeout = (event) => {
                cc.log("post " + url + ": ontimeout");
                const httpError: HttpError = {
                    code: ApiErrorCode.TIMEOUT,
                    error: "ontimeout",
                };
                reject(httpError);
            };
            self.xhr.onerror = (event) => {
                cc.log("post " + url + ": onerror");
                const httpError: HttpError = {
                    code: ApiErrorCode.HTTP_ERROR,
                    error: "onerror",
                };
                reject(httpError);
            };
            self.xhr.setRequestHeader("X-LC-Id", self.header["X-LC-Id"]);
            self.xhr.setRequestHeader("X-LC-Key", self.header["X-LC-Key"]);
            self.xhr.setRequestHeader("content-type", self.header["Content-Type"]);
            self.xhr.responseType = "json";
            //self.xhr.timeout = 3000;
            self.xhr.send(JSON.stringify(body));
        });
    }

    @Loading.applyLoading
    public put<T extends any>(url: string, id: string, body: any): Promise<T> {
        if (this.xhr == null) {
            this.xhr = new XMLHttpRequest();
        }
        const self = this;
        return new Promise<T>((resolve, reject) => {
            self.xhr.open("PUT", self.base_url + url + `/${id}`, true);
            self.xhr.onreadystatechange = () => {
                if (self.xhr.readyState === 4) {
                    cc.log("put " + url + ": status=" + self.xhr.status);
                    const json = self.xhr.response;
                    if (self.xhr.status >= 200 && self.xhr.status < 300) {
                        cc.log("put " + url + ": resolve=" + JSON.stringify(json));
                        resolve(json);
                    } else {
                        const httpError: HttpError = json;
                        Toast.show(httpError.error);
                        cc.log("put reject: " + JSON.stringify(json));
                        reject(httpError);
                    }
                }
            };
            self.xhr.ontimeout = (event) => {
                cc.log("put " + url + ": ontimeout");
                const httpError: HttpError = {
                    code: ApiErrorCode.TIMEOUT,
                    error: "ontimeout",
                };
                reject(httpError);
            };
            self.xhr.onerror = (event) => {
                cc.log("put " + url + ": onerror");
                const httpError: HttpError = {
                    code: ApiErrorCode.HTTP_ERROR,
                    error: "onerror",
                };
                reject(httpError);
            };
            self.xhr.setRequestHeader("X-LC-Id", self.header["X-LC-Id"]);
            self.xhr.setRequestHeader("X-LC-Key", self.header["X-LC-Key"]);
            self.xhr.setRequestHeader("content-type", self.header["Content-Type"]);
            self.xhr.responseType = "json";
            //self.xhr.timeout = 3000;
            self.xhr.send(JSON.stringify(body));
        });
    }

    @Loading.applyLoading
    public delete<T extends any>(url: string, id: string): Promise<T> {
        if (this.xhr == null) {
            this.xhr = new XMLHttpRequest();
        }
        const self = this;
        return new Promise<T>((resolve, reject) => {
            self.xhr.open("DELETE", self.base_url + url + `/${id}`, true);
            self.xhr.onreadystatechange = () => {
                if (self.xhr.readyState === 4) {
                    cc.log("delete " + url + ": status=" + self.xhr.status);
                    const json = self.xhr.response;
                    if (self.xhr.status >= 200 && self.xhr.status < 300) {
                        cc.log("delete " + url + ": resolve=" + JSON.stringify(json));
                        resolve(json);
                    } else {
                        const httpError: HttpError = json;
                        Toast.show(httpError.error);
                        cc.log("delete reject: " + JSON.stringify(json));
                        reject(httpError);
                    }
                }
            };
            self.xhr.ontimeout = (event) => {
                cc.log("delete " + url + ": ontimeout");
                const httpError: HttpError = {
                    code: ApiErrorCode.TIMEOUT,
                    error: "ontimeout",
                };
                reject(httpError);
            };
            self.xhr.onerror = (event) => {
                cc.log("delete " + url + ": onerror");
                const httpError: HttpError = {
                    code: ApiErrorCode.HTTP_ERROR,
                    error: "onerror",
                };
                reject(httpError);
            };
            self.xhr.setRequestHeader("X-LC-Id", self.header["X-LC-Id"]);
            self.xhr.setRequestHeader("X-LC-Key", self.header["X-LC-Key"]);
            self.xhr.setRequestHeader("content-type", self.header["Content-Type"]);
            self.xhr.responseType = "json";
            //self.xhr.timeout = 3000;
            self.xhr.send();
        });
    }
}
