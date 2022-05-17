import { IAuthRet, IAuthFrom } from "../domain/IAuth";
import { IRet } from "../domain/IBase";
import md5 from 'md5';
import db from "../dbConfigs";
import { getUserInfo, registerUser } from "../utils/auth";

async function verify(authFrom: IAuthFrom): Promise<IRet> {
    //const users = await db.find('users', {username: authFrom.username})
    const userInfo = await getUserInfo(authFrom.username)
    //const userinfo = await users.toArray();
    console.log(userInfo)
    if (md5(authFrom.password) == userInfo.password) {
        const ret: IAuthRet = {
            code: 0,
            message: 'success',
            data: {
                userName: userInfo.username,
                info: 'haha'
            }
        }
        return ret;
    }
    const ret: IRet = {
        code: 1,
        message: 'fail'
    }
    return ret
}

async function register(registerFrom: IAuthFrom): Promise<IRet> {
    //const users = await db.find('users', {username: authFrom.username})
    const userInfo = await getUserInfo(registerFrom.username)
    //const userinfo = await users.toArray();
    if (userInfo == undefined || userInfo == 0) {
        const result = await registerUser(registerFrom.username, md5(registerFrom.password))
        if (result) {
            const ret: IAuthRet = {
                code: 0,
                message: 'success',
                data: {
                    userName: 'wxc',
                    info: 'haha'
                }
            }
            return ret;
        }
    }
    const ret: IRet = {
        code: 1,
        message: 'fail'
    }
    return ret
}

export {
    verify,
    register
}