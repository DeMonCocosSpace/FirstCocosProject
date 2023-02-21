interface String {
    isEmpty(): boolean;
}

String.prototype.isEmpty = function (): boolean {
    return this == null || this.length == 0;
};
