import { IRet } from "./IBase";

export interface ITableAdd {
    pkgName: string,
    tableName: string,
    data: any[],
}

export interface ITableAddRet extends IRet {

}

export interface ITableGet {
    pkgName: string,
    tableName: string,
}

export interface ITableGetRet extends IRet {
    data: []
}