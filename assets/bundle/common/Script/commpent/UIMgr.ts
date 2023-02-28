import { ResLoader } from "../../../../main/core/bd/ResLoader";
import { PopupUtil } from "../../../../main/core/ui/popup/PopupUtil";
import { CocosUtils } from "../../../../main/core/utils/CocosUtils";
import { TimeUtils } from "../../../../main/core/utils/TimeUtils";
import AlertEditView from "../AlertEditView ";
import AlertView from "../AlertView";
import CommonSkin from "../conf/CommonSkin";
import ToastView from "../ToastView";

export let UILayer = cc.Enum({
    /** 普通 */
    NORMAL: 100,

    /** 普通弹窗 */
    POP: 200,

    /** Alert */
    ALERT: 300,

    /** Toast */
    TOAST: cc.macro.MAX_ZINDEX,

    /** 加载 */
    LOADING: cc.macro.MAX_ZINDEX - 1,
});

export namespace Loading {
    //记录当前显示了多少次，为0时隐藏
    let loadingCount = 0;
    let loadingView: cc.Node = null;

    export function showLoading() {
        loadingCount++;
        let node = loadingView;
        if (!cc.isValid(node)) {
            const pf = ResLoader.getInstance().getPrefab(CommonSkin.Priority.LoadingView);
            node = cc.instantiate(pf);
            CocosUtils.getInstance().getSceneCanvas().addChild(node, UILayer.LOADING);
            loadingView = node;
        }
        loadingView.active = true;
    }

    export function hideLoading() {
        if (--loadingCount <= 0) {
            loadingCount = 0;
            if (cc.isValid(loadingView)) {
                loadingView.active = false;
            }
        }
    }

    export function asyncLoading<T>(promise: Promise<T>, backCatch?: boolean): Promise<T> {
        return new Promise<T>((reslove, reject) => {
            CC_DEBUG && cc.log("UIMgr 111=" + TimeUtils.timeStr());
            showLoading();
            if (!promise) {
                hideLoading();
            } else {
                //无论什么原因20s后关闭loading
                let timeId = setTimeout(() => {
                    CC_DEBUG && cc.log("asyncLoading 333=" + TimeUtils.timeStr());
                    hideLoading();
                }, 20 * 1000);

                //异步任务
                promise
                    .then((res) => {
                        CC_DEBUG && cc.log("asyncLoading 222=" + TimeUtils.timeStr());
                        reslove(res);
                    })
                    .catch((res) => {
                        CC_DEBUG && cc.log("asyncLoading catch=" + TimeUtils.timeStr());
                        if (!backCatch) {
                            reject(res);
                        } else {
                            backCatch && reject(res);
                        }
                    })
                    .then((res) => {
                        CC_DEBUG && cc.log("asyncLoading 333=" + TimeUtils.timeStr());
                        hideLoading();
                        clearTimeout(timeId);
                        timeId = null;
                    });
            }
        });
    }

    export function applyLoading<T = any>(
        backCatch: boolean
    ): (
        target: Object | Promise<T> | boolean,
        propertyKey?: string | symbol,
        descriptor?: TypedPropertyDescriptor<(...args: any[]) => Promise<T>>
    ) => TypedPropertyDescriptor<(...args: any[]) => Promise<T>>;
    export function applyLoading<T>(target: Promise<T>): Promise<T>;
    export function applyLoading<T>(
        target: Object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<T>>
    );
    export function applyLoading<T>(
        target: Object | Promise<T> | boolean,
        propertyKey?: string | symbol | number,
        descriptor?: TypedPropertyDescriptor<(...args: any[]) => Promise<T>>
    ):
        | TypedPropertyDescriptor<(...args: any[]) => Promise<T>>
        | Promise<T>
        | ((
              target: Object | Promise<T> | boolean,
              propertyKey?: string | symbol,
              descriptor?: TypedPropertyDescriptor<(...args: any[]) => Promise<T>>
          ) => TypedPropertyDescriptor<(...args: any[]) => Promise<T>>) {
        const backCatch = typeof target === "boolean" ? target : false;

        function decorator(
            target: Object,
            propertyKey: string | symbol | number,
            descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<T>>
        ) {
            let oldMethod = descriptor.value;
            descriptor.value = function (...args: any[]): Promise<T> {
                let result = oldMethod.apply(this, args);
                return asyncLoading(result, backCatch);
            };
            return descriptor as TypedPropertyDescriptor<(...args: any[]) => Promise<T>>;
        }
        if (typeof target === "boolean") {
            return decorator;
        }
        if (target instanceof Promise) {
            return asyncLoading(target, backCatch);
        } else {
            return decorator(target, propertyKey, descriptor);
        }
    }
}

export namespace Alert {
    let alertUI: cc.Node = null;
    export function showAlert(content: string): Promise<Boolean> {
        return new Promise<Boolean>((reslove, reject) => {
            let node = alertUI;
            if (!cc.isValid(node)) {
                node = cc.instantiate(
                    ResLoader.getInstance().getPrefab(CommonSkin.Priority.AlertView)
                );
                CommonDepend.CocosUtils.getSceneCanvas().addChild(node, UILayer.ALERT);
                alertUI = node;
            }
            var alert = node.getComponent(AlertView);
            alert
                .build(
                    content,
                    () => {
                        reslove(true);
                    },
                    () => {
                        reslove(false);
                    }
                )
                .show();
        });
    }

    let alertEditUI: cc.Node = null;
    export function showEditAlert(content: string = ""): Promise<string> {
        return new Promise<string>((reslove, reject) => {
            let node = alertEditUI;
            if (!cc.isValid(node)) {
                node = cc.instantiate(
                    ResLoader.getInstance().getPrefab(CommonSkin.Priority.AlertEditView)
                );
                CocosUtils.getInstance().getSceneCanvas().addChild(node, UILayer.ALERT);
                alertEditUI = node;
            }
            var alert = node.getComponent(AlertEditView);
            alert
                .build(
                    content,
                    (text: string) => {
                        if (text.isEmpty()) {
                            reject("content is Empty~");
                        } else if (content === text) {
                            reject("content is Equal~");
                        } else {
                            reslove(text);
                        }
                    },
                    () => {
                        reject("cancel~");
                    }
                )
                .show();
        });
    }
}

export namespace Toast {
    let toastUI: cc.Node = null;
    export function show(msg: string) {
        let node = toastUI;
        if (!cc.isValid(node)) {
            node = cc.instantiate(ResLoader.getInstance().getPrefab(CommonSkin.Priority.ToastView));
            CocosUtils.getInstance().getSceneCanvas().addChild(node, UILayer.TOAST);
            toastUI = node;
        }
        node.getComponent(ToastView).addToast(msg);
    }
}

export namespace UI {
    /**
     * 显示UI
     */
    export function showUI(resDesc: IResDescribe, options?: PopupUtil.IShowOptions) {
        return PopupUtil.show(resDesc, options);
    }

    export function showUISync(resDesc: IResDescribe, options?: PopupUtil.IShowOptions) {
        return PopupUtil.showSync(resDesc, options);
    }

    export function close(resDesc: IResDescribe, options?: PopupUtil.IHideOptions) {
        return PopupUtil.close(resDesc, options);
    }

    export function destroy(resDesc: IResDescribe) {
        return PopupUtil.destroy(resDesc);
    }
}
