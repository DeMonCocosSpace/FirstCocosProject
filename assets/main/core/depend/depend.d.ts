declare var CommonDepend: CommonDependInterface;
declare interface CommonDependInterface {
    CocosUtils: import("./assets/main/core/utils/CocosUtils").CocosUtils;
    ResLoader: import("./assets/main/core/bd/ResLoader").ResLoader;
}

declare namespace CommonDepend {
    export var CocosUtils: import("./assets/main/core/utils/CocosUtils").CocosUtils;
    export var ResLoader: import("./assets/main/core/bd/ResLoader").ResLoader;
}
