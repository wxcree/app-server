import { IRet } from "./IBase";

export interface ITableAdd {
    pkgName: string,
    tableName: string,
    data: any[],
    info: any[]
}

export interface ITableAddRet extends IRet {
    data?: number
}

export interface ITableGet {
    pkgName: string,
    tableName: string,
}

export interface ITableGetRet extends IRet {
    data: []
}