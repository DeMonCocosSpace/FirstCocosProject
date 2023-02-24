export abstract class IHttp {
    protected base_url: string = "https://rhs8b3vn.lc-cn-n1-shared.com/";

    protected header = {
        "X-LC-Id": "rhs8B3vn8K0OiCSorgy9cJQf-gzGzoHsz",
        "X-LC-Key": "ArnoPPZVa4TP5K4sTNCHMEvk",
        "Content-Type": "application/json",
    };

    public abstract get(url: string): Promise<any>;

    public abstract post(url: string, body: any): Promise<any>;
}
