import { lodash } from "./NpmExport";

export namespace Tools {
    export function getComponent<T extends cc.Component, T2 extends cc.Component>(
        node: cc.Node | cc.Component,
        type: { prototype: T },
        type2?: { prototype: T2 }
    ): T | T2 {
        return node.getComponent(type) || (type2 && node.getComponent(type2));
    }

    /** 为数字前面填充指定长度的fullStr*/
    export function fillValue(value: number, len: number = 2, fullStr: string = "0"): string {
        let str = (value % Math.pow(10, len)).toString();
        return fullStr.repeat((len - str.length) / fullStr.length) + str;
    }
    /** 限制数字在范围内 */
    export function limit(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(value, max));
    }

    /** 限制数字在范围内 */
    export function isLimit(value: number, min: number, max: number): boolean {
        return value >= min && value <= max;
    }

    /** 限制数字在数组范围内 */
    export function isLimitArray(value: number, array: any[]): boolean {
        return value >= 0 && value < array.length;
    }

    export function randElement<T>(array: T[]): T {
        return array[Math.round(Math.random() * (array.length - 1))];
    }

    export function isToday(value: number, nowTime: number = Date.now()): boolean {
        return new Date(value).toDateString() == new Date(nowTime).toDateString();
    }

    export function toArray<T>(value: T | T[]): T[] {
        if (value instanceof Array) {
            return value;
        }
        return [value];
    }

    export function evenyEmpty<T, R>(array: T[], callfunc: (item: T) => R): R {
        for (let i = 0; i < array.length; i++) {
            let result = callfunc(array[i]);
            if (!lodash.isEmpty(result)) {
                return result;
            }
        }
        return;
    }

    export function formatStringInArgs(
        value: string,
        ...args: ({ [key: string]: string | number } | number)[]
    ) {
        let result = value;

        args.filter((args) => {
            return typeof args === "object";
        }).forEach((args) => {
            const matchArgStrings = result.match(/{[^{}]*}/g); //{value=xx};
            matchArgStrings?.forEach((searchValue) => {
                const str = searchValue.match(/[^{][^}]*/)?.[0] ?? ""; //value=xx
                let match = /^\[(?<object>[^\[]+)\]\[(?<key>[^[]+)\]$/g.exec(str);
                if (match && match.groups?.object && match.groups?.key) {
                    //[a=1,b=2][key]
                    const object = match.groups.object;
                    const [key, type = ""] = match.groups.key.split(",");
                    if (args[key] === undefined) {
                        return;
                    }
                    result = object.split(",").reduce((obj, current) => {
                        const [key = "", value = ""] = current.split("=");
                        switch (type) {
                            case "number": {
                                obj[key] = Number(value);
                                break;
                            }
                            default: {
                                obj[key] = value;
                                break;
                            }
                        }
                        return obj;
                    }, {})?.[args[key]];
                } else {
                    const [key = "", value = "{}"] = str.split("=");

                    if (args[key] === undefined) {
                        return;
                    }
                    result = result.replace(searchValue, args[key]?.toString() ?? value);
                }
            });
        });

        return result;
    }

    export function formatString(
        value: string,
        ...args: ({ [key: string]: string | number } | number)[]
    ) {
        let result = value;

        args.filter((args) => {
            return typeof args === "object";
        }).forEach((args) => {
            const matchArgStrings = result.match(/{[^{}]*}/g); //{value=xx};
            matchArgStrings?.forEach((searchValue) => {
                const str = searchValue.match(/[^{][^}]*/)?.[0] ?? ""; //value=xx
                const [key = "", value = "{}"] = str.split("=");
                if (args[key] !== undefined) {
                    result = result.replace(searchValue, args[key]?.toString() ?? value);
                }
            });
        });

        const matchArgStrings = result.match(/{[^{}]*}/g); //{value=xx};
        matchArgStrings?.forEach((searchValue) => {
            const str = searchValue.match(/[^{][^}]*/)?.[0] ?? ""; //value=xx
            const [key = "", value = ""] = str.split("=");
            result = result.replace(searchValue, value);
        });
        return result;
    }

    export function transateUrlParams(url: string, params: string): string {
        const result = lodash
            .chain(lodash.toPairs(params))
            .filter(([key, value]) => value !== undefined)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .reduce(
                (pre, cur) => (pre.endsWith("?") ? `${pre}${cur}` : `${pre}&${cur}`),
                url + (url.includes("?") ? "" : "?")
            )
            .value();
        return result;
    }

    export function formatStringOnArrayIndex(value: string, ...args: number[]) {
        if (!args.length) {
            return;
        }
        let result = value;
        let index = 0;
        for (;;) {
            const matchArgStrings = result.match(/\[([^\[\]]*\])/g); //[1231,2313,3131];
            if (!matchArgStrings) {
                break;
            }
            matchArgStrings.forEach((v) => {
                result = result.replace(v, v.replace(/\[|\]/g, `%${index++}%`));
            });
        }

        for (let i = 0; i < args.length; i++) {
            let index = args[i];
            const flag = result.match(/%\d%/)?.[0];
            if (!flag) {
                break;
            }
            const matchArgStrings = result.match(new RegExp(`${flag}(.*)${flag}`));
            if (!matchArgStrings) {
                break;
            }
            const [fullStr, subStr] = matchArgStrings;
            let array = subStr.split(",");
            if (!lodash.isEmpty(array)) {
                let value = array[limit(index, 0, array.length - 1)] || "";
                result = result.replace(`${fullStr}`, value);
            }
        }

        return result;
    }
    export function arrayCompareResult<T, R>(array: T[], callfunc: (a: T, b: T) => R): R[] {
        const newArray: R[] = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i] === undefined || array[i + 1] === undefined) {
                continue;
            }
            newArray.push(callfunc(array[i], array[i + 1]));
        }
        return newArray;
    }

    export function last<T>(array: Array<T>): T {
        return array[array.length - 1];
    }

    export function delayTime(time: number, target?: cc.Component) {
        return new Promise((resolve) => {
            if (target) {
                target.scheduleOnce(() => {
                    resolve(true);
                }, time);
            } else {
                setTimeout(() => {
                    resolve(true);
                }, time * 1000);
            }
        });
    }

    export function strMapToObj(strMap) {
        let obj = Object.create(null);
        for (let [k, v] of strMap) {
            obj[k] = v;
        }
        return obj;
    }

    export function clickManager(btnNode: cc.Node, timeout = 1500) {
        if (!cc.isValid(btnNode)) {
            return;
        }
        let noteBtn = btnNode.getComponent(cc.Button);
        if (cc.isValid(noteBtn)) {
            noteBtn.interactable = false;
        }
        let timer = setTimeout(function () {
            if (cc.isValid(noteBtn)) {
                noteBtn.interactable = true;
            }
            clearInterval(timer);
        }, timeout);
    }

    export function formatNumStr(numStr: string): string {
        let num: number = parseFloat(numStr);
        return String(num);
    }

    export function strip(num: number, precision = 12) {
        return parseFloat(num.toPrecision(precision));
    }

    /**
     * 计算字符串字符数量，一个汉字算两个字符
     * @param str
     */
    export function calcCharacterNum(str: string): number {
        let len = 0;
        let strArray: string[] = str.match(/[\u4e00-\u9fa5]/g);
        if (strArray) {
            len = strArray.join("").length;
        }

        return str.length + len;
    }
}
window["Tools"] = Tools;
