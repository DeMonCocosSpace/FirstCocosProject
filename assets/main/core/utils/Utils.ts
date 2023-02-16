export namespace Utils {
    /**
     * 函数重载，单参数min默认为0
     */
    export function randomInt(max: number): number;
    export function randomInt(min: number, max: number): number;

    export function randomInt(min: number, max?: number): number {
        if (max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        } else {
            return Math.floor(Math.random() * (min + 1));
        }
    }
}
