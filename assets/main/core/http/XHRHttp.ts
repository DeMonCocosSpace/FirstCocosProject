import { IHttp } from "./IHttp";

export default class extends IHttp {
    public get(url: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    public post(url: string, body: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
}
