import { IRet as IRet } from "./IBase";

export interface IPkgGetFrom {
    pkgName: string | undefined,
}

export interface IPkgGetRet extends IRet {
    data: any[],
}

export interface IPkgSetFrom {
    pkgName: string,
}

export interface IPkgAddFrom {
    pkgName: string,
    tableName: string,
}