import { IRet } from "./IBase";

export interface IAuthRet extends IRet {
    data : {
        userName: string,
        info: string,
    }
}

export interface IAuthFrom {
    username: string,
    password: string,
}