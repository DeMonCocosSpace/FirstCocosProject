import { lodash } from "../../NpmExport";

export namespace PopupUtil {
    export interface IShowOptions {
        parent?: cc.Node;
        args?: any[];

        zIndex?: number;

        new?: boolean;
    }

    export interface IHideOptions {
        parant?: cc.Node;
        args?: any[];
        new?: boolean;
    }

    enum PopupState {
        None = "none",
        Show = "show",
        Hide = "hide",
        Close = "close",
    }
    enum PopupEvent {
        ChangeState = "core_change_state",
    }

    @cc._decorator.ccclass
    export abstract class BasePopup extends cc.Component {
        private __state: PopupState = PopupState.None;

        private _setState(value: PopupState, ...args: any) {
            this.__state = value;
            this.node.emit(`${PopupEvent.ChangeState}_${this.__state}`, ...args);
        }

        protected get _content() {
            return this.node.getChildByName("content") || this.node.getChildByName("frame");
        }

        public onConstruct() {}

        public async preInit(...args: any[]) {}

        public abstract init(...args: any[]): void;

        public abstract ready(...args: any[]): void;

        protected abstract onShow(): Promise<void>;

        protected abstract onHide(...args: any[]): Promise<void>;
        protected abstract onClose(...args: any[]): Promise<void>;

        public async show(...args: any[]): Promise<void> {
            this.node.active = true;
            if (this.__state !== PopupState.Show) {
                await this.onShow();
                this._setState(PopupState.Show);
            }
            this.ready(...args);
            return;
        }
        public async hide(...args: any[]): Promise<void> {
            await this.onHide(...args);
            this.node.active = false;
            this._setState(PopupState.Hide, ...args);
            return;
        }
        public async close(...args: any[]): Promise<void> {
            await this.hide(...args);
            await this.onClose(...args);
            this._setState(PopupState.Close, ...args);
            this.node.destroy();
            return;
        }
    }

    export function createShowResult(popupNode: cc.Node) {
        const popup = popupNode.getComponent(BasePopup);
        let result = {
            onShow: (callfunc: () => void) => {
                popupNode.once(`${PopupEvent.ChangeState}_${PopupState.Show}`, callfunc, this);
                return result;
            },
            onHide: (callfunc?: (...args: any[]) => void) => {
                popupNode.once(`${PopupEvent.ChangeState}_${PopupState.Hide}`, callfunc, this);
                return result;
            },
            onClose: (callfunc?: (...args: any[]) => void) => {
                popupNode.once(`${PopupEvent.ChangeState}_${PopupState.Close}`, callfunc, this);
                return result;
            },
            hide: (...args: any[]) => {
                if (cc.isValid(popup)) {
                    popup?.hide?.(...args);
                }
            },
            close: (...args: any[]) => {
                if (cc.isValid(popup)) {
                    popup?.close?.(...args);
                }
            },
            popupNode,
        };
        return result;
    }

    export function createNode(prefab: cc.Prefab, options?: IShowOptions) {
        const popupNode = cc.instantiate(prefab);
        const parent = options?.parent ?? CommonDepend.CocosUtils.getSceneCanvas();
        if (!cc.isValid(parent)) {
            cc.warn("[PopupUtil] popup set parent failed!, parent is isValid");
            return null;
        }
        parent.addChild?.(popupNode, options?.zIndex ?? 0);

        const popup = popupNode.getComponent(BasePopup);
        popup?.onConstruct?.();

        return popupNode;
    }

    export function popupShow(popupNode: cc.Node, options?: IShowOptions) {
        const popup = popupNode.getComponent(BasePopup);
        popup?.init?.(...(options?.args ?? []));
        popup?.show?.(...(options?.args ?? [])) ?? Promise.resolve((popupNode.active = true));
    }
    export async function preload(resDesc: IResDescribe, options?: IShowOptions) {
        let popupNode = getPopup(resDesc, options)?.node;
        if (!cc.isValid(popupNode)) {
            let prefab = await CommonDepend.ResLoader.loadResFromBundle<cc.Prefab>(resDesc);
            if (!prefab) {
                if (CC_DEBUG) {
                    CC_DEBUG && cc.error(`[PopupUtil] show loadResFromBundle failed`, resDesc);
                }
                throw Error("ui  preload failed");
            }
            popupNode = createNode(prefab, options);
        }
        if (!cc.isValid(popupNode)) {
            return;
        }
        popupNode.active = false;
        const popup = popupNode.getComponent(BasePopup);
        await popup?.preInit?.(...(options?.args ?? []));
        return createShowResult(popupNode);
    }

    export async function show(resDesc: IResDescribe, options?: IShowOptions) {
        if (lodash.isEmpty(resDesc)) {
            if (CC_DEBUG) throw "[PopupUtil] show resDesc not empty";
        }
        let popupNode = getPopup(resDesc, options)?.node;
        if (!cc.isValid(popupNode)) {
            let prefab = await CommonDepend.ResLoader.loadResFromBundle<cc.Prefab>(resDesc);
            if (!prefab) {
                if (CC_DEBUG) {
                    CC_DEBUG && cc.error(`[PopupUtil] show loadResFromBundle failed`, resDesc);
                }
                return;
            }
            popupNode = createNode(prefab, options);
        }
        if (!cc.isValid(popupNode)) {
            return;
        }
        popupShow(popupNode, options);

        return createShowResult(popupNode);
    }

    export function showSync(resDesc: IResDescribe, options?: IShowOptions) {
        let popupNode = getPopup(resDesc, options)?.node;
        if (!cc.isValid(popupNode)) {
            let prefab: cc.Prefab = CommonDepend.ResLoader.getResFromBundle(resDesc);
            if (!prefab) {
                if (CC_DEBUG) {
                    CC_DEBUG && cc.error(`[PopupUtil] show loadResFromBundle failed`, resDesc);
                }
                return;
            }
            popupNode = createNode(prefab, options);
        }
        if (!cc.isValid(popupNode)) {
            return;
        }
        popupShow(popupNode, options);

        return createShowResult(popupNode);
    }

    export function getPopup(resDesc: IResDescribe, options?: IHideOptions) {
        let nodeName = lodash.last(resDesc?.resPath?.split("/"));
        if (!nodeName) {
            return undefined;
        }
        let parent = options?.parant ?? CommonDepend.CocosUtils.getSceneCanvas();
        return options?.new == true
            ? undefined
            : parent?.getChildByName?.(nodeName)?.getComponent?.(BasePopup);
    }

    export function hide(resDesc: IResDescribe, options?: IHideOptions) {
        let popup = getPopup(resDesc, options);
        return popup?.hide?.(...(options?.args ?? []));
    }

    export function close(resDesc: IResDescribe, options?: IHideOptions) {
        let popup = getPopup(resDesc, options);
        return popup?.close?.(...(options?.args ?? []));
    }

    export function destroy(resDesc: IResDescribe, options?: IHideOptions) {
        let popup = getPopup(resDesc, options);
        return popup?.node?.destroy?.();
    }
}
