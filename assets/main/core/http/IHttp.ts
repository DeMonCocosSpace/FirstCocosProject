export enum ApiErrorCode {
    TIMEOUT = 10000,
    HTTP_ERROR = 20000,
    OFFLINE = 30000,
    SDK_QUERY_FAILED = 40000,
}
export abstract class IHttp {
    protected base_url: string = "https://rhs8b3vn.lc-cn-n1-shared.com/1.1/";

    protected header = {
        "X-LC-Id": "rhs8B3vn8K0OiCSorgy9cJQf-gzGzoHsz",
        "X-LC-Key": "ArnoPPZVa4TP5K4sTNCHMEvk",
        "Content-Type": "application/json",
    };

    public abstract get<T extends any>(url: string): Promise<T>;

    public abstract post<T extends any>(url: string, body: any): Promise<T>;

    public abstract put<T extends any>(url: string, id: string, body: any): Promise<T>;

    public abstract delete<T extends any>(url: string, id: string): Promise<T>;
}
