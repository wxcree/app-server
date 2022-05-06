import db from '../dbConfigs'

export async function getUserInfo(name:string): Promise<any> {
    const query = `SELECT * FROM users WHERE username='${name}'`
    const res: any = await db.sysQuery(query)
    // console.log(ret[0][0]['id'])
    if(res[0][0] === undefined)return 0
    const ret = res[0][0]
    return ret
}