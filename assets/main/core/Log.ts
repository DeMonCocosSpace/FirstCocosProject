export namespace Log {
    export function method(
        target: Object,
        propertyKey?: string | symbol,
        descriptor?: TypedPropertyDescriptor<(...args: any[]) => any>
    ): any {
        function decorator(
            target: Object,
            propertyKey: string | symbol | number,
            descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
        ) {
            let oldMethod = descriptor.value;
            descriptor.value = function (...args: any[]): any {
                let result = oldMethod.apply(this, args);
                let clsName = "";
                if (typeof target == "function") {
                    clsName = target.name;
                } else if (typeof target == "object") {
                    clsName = target.constructor.name;
                }
                cc.log(`${clsName} ${String(propertyKey)}`);
                return result;
            };
            return descriptor as TypedPropertyDescriptor<(...args: any[]) => any>;
        }

        return decorator(target, propertyKey, descriptor);
    }
}
