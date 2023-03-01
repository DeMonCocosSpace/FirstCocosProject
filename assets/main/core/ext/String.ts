interface String {
    isEmpty(): boolean;
}

String.prototype.isEmpty = function (): boolean {
    return this == undefined || this == null || this.length == 0;
};
