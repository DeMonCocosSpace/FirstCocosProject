import { IncomingMessage, RequestOptions } from "http";
import { Loading, Toast } from "../../../bundle/common/Script/commpent/UIMgr";
import { https } from "../NpmExport";
import { ApiErrorCode, IHttp } from "./IHttp";

export default class HttpsHttp extends IHttp {
    @Loading.applyLoading
    public get<T extends any>(url: string): Promise<T> {
        const self = this;
        return new Promise<T>((resolve, reject) => {
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
                    try {
                        const json = JSON.parse(data);
                        if (response.statusCode >= 200 && response.statusCode < 300) {
                            cc.log("get resolve: " + JSON.stringify(json));
                            resolve(json);
                        } else {
                            cc.log("get reject: " + JSON.stringify(json));
                            const httpError: HttpError = json;
                            Toast.show(json["error"]);
                            reject(httpError);
                        }
                    } catch (error) {
                        cc.log("get JSON.parse: " + error);
                        const httpError: HttpError = {
                            code: ApiErrorCode.HTTP_ERROR,
                            error: error,
                        };
                        reject(httpError);
                    }
                });
                response.on("error", (error) => {
                    cc.log("get error: " + error);
                    const httpError: HttpError = {
                        code: ApiErrorCode.HTTP_ERROR,
                        error: error,
                    };
                    reject(httpError);
                });
            });
            req.on("error", (error) => {
                cc.log("get error: " + error);
                const httpError: HttpError = {
                    code: ApiErrorCode.HTTP_ERROR,
                    error: error,
                };
                reject(httpError);
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
                cc.log("delete " + url + ": " + response.statusCode);
                let data = "";
                response.on("data", (d) => {
                    return (data += d);
                });
                response.on("end", () => {
                    try {
                        const json = JSON.parse(data);
                        if (response.statusCode >= 200 && response.statusCode < 300) {
                            cc.log("post resolve: " + JSON.stringify(json));
                            resolve(json);
                        } else {
                            cc.log("post reject: " + JSON.stringify(json));
                            const httpError: HttpError = json;
                            Toast.show(httpError.error);
                            reject(httpError);
                        }
                    } catch (error) {
                        cc.log("post JSON.parse: " + error);
                        const httpError: HttpError = {
                            code: ApiErrorCode.HTTP_ERROR,
                            error: error,
                        };
                        reject(httpError);
                    }
                });
                response.on("error", (error) => {
                    cc.log("post error: " + error);
                    const httpError: HttpError = {
                        code: ApiErrorCode.HTTP_ERROR,
                        error: error,
                    };
                    reject(httpError);
                });
            });
            req.on("error", (error) => {
                cc.log("post error: " + error);
                const httpError: HttpError = {
                    code: ApiErrorCode.HTTP_ERROR,
                    error: error,
                };
                reject(httpError);
            });
            req.write(JSON.stringify(body));
            req.end();
        });
    }
    @Loading.applyLoading
    public put<T extends any>(url: string, id: string, body: any): Promise<T> {
        const self = this;
        return new Promise<any>((resolve, reject) => {
            const options: RequestOptions = {
                method: "PUT",
                path: self.base_url + url + `/${id}`,
                headers: self.header,
            };
            const req = https.request(options, (response: IncomingMessage) => {
                cc.log("put " + url + ": " + response.statusCode);
                let data = "";
                response.on("data", (d) => {
                    return (data += d);
                });
                response.on("end", () => {
                    try {
                        const json = JSON.parse(data);
                        if (response.statusCode >= 200 && response.statusCode < 300) {
                            cc.log("put resolve: " + JSON.stringify(json));
                            resolve(json);
                        } else {
                            cc.log("put reject: " + JSON.stringify(json));
                            const httpError: HttpError = json;
                            Toast.show(httpError.error);
                            reject(httpError);
                        }
                    } catch (error) {
                        cc.log("put JSON.parse: " + error);
                        const httpError: HttpError = {
                            code: ApiErrorCode.HTTP_ERROR,
                            error: error,
                        };
                        reject(httpError);
                    }
                });
                response.on("error", (error) => {
                    cc.log("put error: " + error);
                    const httpError: HttpError = {
                        code: ApiErrorCode.HTTP_ERROR,
                        error: error,
                    };
                    reject(httpError);
                });
            });
            req.on("error", (error) => {
                cc.log("put error: " + error);
                const httpError: HttpError = {
                    code: ApiErrorCode.HTTP_ERROR,
                    error: error,
                };
                reject(httpError);
            });
            req.write(JSON.stringify(body));
            req.end();
        });
    }
    @Loading.applyLoading
    public delete<T extends any>(url: string, id: string): Promise<T> {
        const self = this;
        return new Promise<any>((resolve, reject) => {
            const options: RequestOptions = {
                method: "DELETE",
                path: self.base_url + url + `/${id}`,
                headers: self.header,
            };
            const req = https.request(options, (response: IncomingMessage) => {
                cc.log("post " + url + ": " + response.statusCode);
                let data = "";
                response.on("data", (d) => {
                    return (data += d);
                });
                response.on("end", () => {
                    try {
                        const json = JSON.parse(data);
                        if (response.statusCode >= 200 && response.statusCode < 300) {
                            cc.log("delete resolve: " + JSON.stringify(json));
                            resolve(json);
                        } else {
                            cc.log("delete reject: " + JSON.stringify(json));
                            const httpError: HttpError = json;
                            Toast.show(httpError.error);
                            reject(httpError);
                        }
                    } catch (error) {
                        cc.log("delete JSON.parse: " + error);
                        const httpError: HttpError = {
                            code: ApiErrorCode.HTTP_ERROR,
                            error: error,
                        };
                        reject(httpError);
                    }
                });
                response.on("error", (error) => {
                    cc.log("delete error: " + error);
                    const httpError: HttpError = {
                        code: ApiErrorCode.HTTP_ERROR,
                        error: error,
                    };
                    reject(httpError);
                });
            });
            req.on("error", (error) => {
                cc.log("delete error: " + error);
                const httpError: HttpError = {
                    code: ApiErrorCode.HTTP_ERROR,
                    error: error,
                };
                reject(httpError);
            });
            req.end();
        });
    }
}
