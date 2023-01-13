import { BundleName } from "../BundleName";

declare namespace BdDepend {
    type TBundleName = import("../BundleName").BundleName;

    export type TBundleSkinDepend = {
        [index in TBundleName]?: TBundleName[];
    };
}

export namespace BundleDepend {
    let depend: BdDepend.TBundleSkinDepend = {
        [BundleName.COMMON]: [],
        [BundleName.LOGIN]: [BundleName.COMMON],
        [BundleName.PLAZA]: [BundleName.COMMON],
    };

    export function getDepend(bundleName: BundleName) {
        return depend?.[bundleName] ?? [];
    }
}
