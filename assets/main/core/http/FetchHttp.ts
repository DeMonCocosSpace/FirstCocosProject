import { Loading, Toast } from "../../../bundle/common/Script/commpent/UIMgr";
import { ApiErrorCode, IHttp } from "./IHttp";

export default class FetchHttp extends IHttp {
    @Loading.applyLoading
    public get<T extends any>(url: string): Promise<T> {
        const self = this;
        return new Promise<T>((resolve, reject) => {
            fetch(self.base_url + url, {
                method: "GET",
                headers: self.header,
            })
                .then((response) => {
                    cc.log("get " + url + ": " + response.status);
                    response.json().then((json) => {
                        if (response.status >= 200 && response.status < 300) {
                            cc.log("get resolve: " + JSON.stringify(json));
                            resolve(json);
                        } else {
                            const httpError: HttpError = json;
                            Toast.show(httpError.error);
                            cc.log("get reject: " + JSON.stringify(json));
                            reject(httpError);
                        }
                    });
                })
                .catch((error) => {
                    cc.log("get reject: " + error);
                    const httpError: HttpError = {
                        code: ApiErrorCode.HTTP_ERROR,
                        error: error,
                    };
                    reject(httpError);
                });
        });
    }

    @Loading.applyLoading
    public post<T extends any>(url: string, body: any): Promise<T> {
        const self = this;
        return new Promise<T>((resolve, reject) => {
            fetch(self.base_url + url, {
                method: "POST",
                headers: self.header,
                body: JSON.stringify(body),
            })
                .then((response) => {
                    cc.log("post " + url + ": " + response.status);
                    response.json().then((json) => {
                        const result: HttpResult<T> = {
                            code: response.status,
                            result: json,
                            error: json["error"],
                        };
                        if (response.status >= 200 && response.status < 300) {
                            cc.log("post resolve: " + JSON.stringify(json));
                            resolve(json);
                        } else {
                            const httpError: HttpError = json;
                            Toast.show(httpError.error);
                            cc.log("post reject: " + JSON.stringify(json));
                            reject(httpError);
                        }
                    });
                })
                .catch((error) => {
                    cc.log("post reject: " + error);
                    const httpError: HttpError = {
                        code: ApiErrorCode.HTTP_ERROR,
                        error: error,
                    };
                    reject(httpError);
                });
        });
    }

    @Loading.applyLoading
    public put<T extends any>(url: string, id: string, body: any): Promise<T> {
        const self = this;
        return new Promise<T>((resolve, reject) => {
            fetch(self.base_url + url + `/${id}`, {
                method: "PUT",
                headers: self.header,
                body: JSON.stringify(body),
            })
                .then((response) => {
                    cc.log("put " + url + ": " + response.status);
                    response.json().then((json) => {
                        const result: HttpResult<T> = {
                            code: response.status,
                            result: json,
                            error: json["error"],
                        };
                        if (response.status >= 200 && response.status < 300) {
                            cc.log("put resolve: " + JSON.stringify(json));
                            resolve(json);
                        } else {
                            const httpError: HttpError = json;
                            Toast.show(httpError.error);
                            cc.log("put reject: " + JSON.stringify(json));
                            reject(httpError);
                        }
                    });
                })
                .catch((error) => {
                    cc.log("put reject: " + error);
                    const httpError: HttpError = {
                        code: ApiErrorCode.HTTP_ERROR,
                        error: error,
                    };
                    reject(httpError);
                });
        });
    }

    @Loading.applyLoading
    public delete<T extends any>(url: string, id: string): Promise<T> {
        const self = this;
        return new Promise<T>((resolve, reject) => {
            fetch(self.base_url + url + `/${id}`, {
                method: "DELETE",
                headers: self.header,
            })
                .then((response) => {
                    cc.log("delete " + url + ": " + response.status);
                    response.json().then((json) => {
                        const result: HttpResult<T> = {
                            code: response.status,
                            result: json,
                            error: json["error"],
                        };
                        if (response.status >= 200 && response.status < 300) {
                            cc.log("delete resolve: " + JSON.stringify(json));
                            resolve(json);
                        } else {
                            const httpError: HttpError = json;
                            Toast.show(httpError.error);
                            cc.log("delete reject: " + JSON.stringify(json));
                            reject(httpError);
                        }
                    });
                })
                .catch((error) => {
                    cc.log("delete reject: " + error);
                    const httpError: HttpError = {
                        code: ApiErrorCode.HTTP_ERROR,
                        error: error,
                    };
                    reject(httpError);
                });
        });
    }
}
