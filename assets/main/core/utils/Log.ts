export namespace Log {
    declare type MethodDecorator = <T>(
        target: Object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<T>
    ) => TypedPropertyDescriptor<T> | void;

    export const method: MethodDecorator = (
        target: Object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
        let clsName = "";
        if (typeof target == "function") {
            clsName = target.name;
        } else if (typeof target == "object") {
            clsName = target.constructor.name;
        }
        cc.log(`${clsName} ${String(propertyKey)}`);
    };
}
