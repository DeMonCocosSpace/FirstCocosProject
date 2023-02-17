import { IncomingMessage } from "http";
import { https } from "../../../main/core/NpmExport";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HttpView extends cc.Component {
    protected onLoad(): void {}

    clickHttp() {
        const options = {
            hostname: "github.com",
            port: 443,
            path: "/",
            method: "GET",
        };
        //options.agent = new https.Agent(options);
        const req = https.request(options, (res) => {
            console.log("All OK. Server matched our pinned cert or public key");
            console.log("statusCode:", res.statusCode);
            // Print the HPKP values
            console.log("headers:", res.headers["public-key-pins"]);

            res.on("data", (d) => {});
        });

        req.on("error", (e) => {
            console.error(e.message);
        });
        req.end();
    }
}
