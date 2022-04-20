import { IAuthRet, IAuthFrom } from "../domain/IAuth";
import { IRet } from "../domain/IBase";
import md5 from 'md5';
import db from "../dbConfigs";

async function verify(authFrom: IAuthFrom): Promise<IRet> {
    const users = await db.find('users', {username: authFrom.username})
    const userinfo = await users.toArray();
    if (md5(authFrom.password) == userinfo[0]['password']) {
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
    const ret: IRet = {
        code: 1,
        message: 'fail'
    }
    return ret
}

export {
    verify
}