class Listener extends cc.EventTarget {
    constructor() {
        super();
        window["Listener"] = this;
    }
    public send(key: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any): void {
        return this.emit(key, arg1, arg2, arg3, arg4, arg5);
    }

    public listen<T extends Function>(
        type: string,
        callback: T,
        target?: any,
        useCapture?: boolean
    ): T {
        return this.on(type, callback, target, useCapture);
    }

    public listens<T extends Function>(
        types: string[],
        callback: T,
        target?: any,
        useCapture?: boolean
    ): T[] {
        return types.map((type) => this.on(type, callback, target, useCapture));
    }

    public listenOnce(
        type: string,
        callback: (arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) => void,
        target?: any
    ): void {
        return this.once(type, callback, target);
    }

    public listenOff(type: string, callback?: Function, target?: any): void {
        return this.off(type, callback, target);
    }

    public listenOffTarget(target: any) {
        return this.targetOff(target);
    }
}
export default new Listener();
