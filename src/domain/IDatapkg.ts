
interface ITable {
    name: string,
}

export interface IDatapkgFrom {
    pkgName: string,
    pkgs: ITable[],
}