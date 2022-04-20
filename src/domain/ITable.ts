import { IBase } from "./IBase";

export interface ITableAdd {
    pkgName: string,
    tableName: string,
    data: any[],
}

export interface ITableAddRet extends IBase {

}

export interface ITableGet {
    pkgName: string,
    tableName: string,
}

export interface ITableGetRet extends IBase {
    data: []
}