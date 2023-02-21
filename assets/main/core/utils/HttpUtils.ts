import { Loading, Toast } from "../../../bundle/common/Script/commpent/UIMgr";

export default class HttpUtils {
    private static base_url = "https://rhs8b3vn.lc-cn-n1-shared.com/";

    @Loading.applyLoading
    public static get(url: string) {
        return new Promise(function (resolve, reject) {
            fetch(HttpUtils.base_url + url, {
                method: "GET",
                headers: {
                    "X-LC-Id": "rhs8B3vn8K0OiCSorgy9cJQf-gzGzoHsz",
                    "X-LC-Key": "ArnoPPZVa4TP5K4sTNCHMEvk",
                    "Content-Type": "application/json",
                },
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
    public static post(url: string, body: any) {
        return new Promise(function (resolve, reject) {
            fetch(HttpUtils.base_url + url, {
                method: "POST",
                headers: {
                    "X-LC-Id": "rhs8B3vn8K0OiCSorgy9cJQf-gzGzoHsz",
                    "X-LC-Key": "ArnoPPZVa4TP5K4sTNCHMEvk",
                    "Content-Type": "application/json",
                },
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
