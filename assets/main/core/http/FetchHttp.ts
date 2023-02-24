import { Loading, Toast } from "../../../bundle/common/Script/commpent/UIMgr";
import { IHttp } from "./IHttp";

export default class FetchHttp extends IHttp {
    @Loading.applyLoading
    public get(url: string): Promise<any> {
        const self = this;
        return new Promise(function (resolve, reject) {
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
                            Toast.show(json["error"]);
                            cc.log("get reject: " + JSON.stringify(json));
                            reject(json);
                        }
                    });
                })
                .catch((error) => {
                    cc.log("get reject: " + error);
                    reject(error);
                });
        });
    }

    @Loading.applyLoading
    public post(url: string, body: any): Promise<any> {
        const self = this;
        return new Promise(function (resolve, reject) {
            fetch(self.base_url + url, {
                method: "POST",
                headers: self.header,
                body: JSON.stringify(body),
            })
                .then((response) => {
                    cc.log("post " + url + ": " + response.status);
                    response.json().then((json) => {
                        if (response.status >= 200 && response.status < 300) {
                            cc.log("post resolve: " + JSON.stringify(json));
                            resolve(json);
                        } else {
                            Toast.show(json["error"]);
                            cc.log("post reject: " + JSON.stringify(json));
                            reject(json);
                        }
                    });
                })
                .catch((error) => {
                    cc.log("post reject: " + error);
                    reject(error);
                });
        });
    }
}
