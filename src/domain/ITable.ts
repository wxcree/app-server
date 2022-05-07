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

export interface ITableViewAdd {
    pkgName: string,
    tableName: string,
    viewName: string,
    columns: string[],
    values: string[] | undefined
}

export interface ITableMutiGet {
    pkgName: string,
    tableName: string,
    columns: string[],
    values: string[]
}

export interface ITableGetRet extends IRet {
    data: []
}