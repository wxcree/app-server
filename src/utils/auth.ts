import db from '../dbConfigs'

export async function getUserInfo(name:string): Promise<any> {
    const query = `SELECT * FROM users WHERE username='${name}'`
    const res: any = await db.sysQuery(query)
    // console.log(ret[0][0]['id'])
    if(res[0][0] === undefined)return 0
    const ret = res[0][0]
    return ret
}

export async function registerUser(name:string, password:string): Promise<any> {
    const query = `INSERT INTO users (username, password, rola) VALUES ('${name}', '${password}', 0)`
    // console.log(ret[0][0]['id'])
    let ret = true
    try {
        const res: any = await db.sysQuery(query)
        ret = res[0]['insertId']
    } catch (e) {
        ret = false
        console.log(e)
        console.log('insertTable fail')
    }
    return ret
}