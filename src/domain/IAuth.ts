import { IBase } from "./IBase";

export interface IAuthRet extends IBase {
    data : {
        userName: string,
        info: string,
    }
}

export interface IAuthFrom {
    username: string,
    password: string,
}