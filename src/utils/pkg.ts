import db from '../dbConfigs'
import moment from 'moment'
import { businessPkg, businessTable, datadb } from '../configs'

// INSERT INTO sysdb.business_pkg (name, create_time, create_user_id) VALUES ('mytest', '2022-05-02 10:27:00', null)
export async function insertPkg(pkgName: string): Promise<number> {
    const date = moment().format('YYYY-MM-DD HH:mm:ss')
    const query = `INSERT INTO ${businessPkg} (name, create_time, create_user_id) VALUES ('${pkgName}', '${date}', null)`
    // console.log(query)
    let ret = 0
    try {
        const res: any = await db.sysQuery(query)
        ret = res[0]['insertId']
    } catch (e) {
        ret = 0
    }
    return ret
}

export async function getPkgId(pkgName:string): Promise<number> {
    const query = `SELECT id FROM ${businessPkg} WHERE name='${pkgName}'`
    const res: any = await db.sysQuery(query)
    // console.log(ret[0][0]['id'])
    if(res[0][0] === undefined)return 0
    const ret = res[0][0]['id']
    return ret
}

export async function insertTableByName(pkgName:string, tableName: string, type = 0): Promise<boolean> {
    const id = await getPkgId(pkgName)
    return await insertTableByid(id, tableName, type)
}
// INSERT INTO sysdb.business_tables (table_name, db_name, pkgid, create_time, create_user_id, type) VALUES ('testtable', 'dataset', 2, '2022-05-02 11:39:35', null, 0)
export async function insertTableByid(id:number, tableName: string, type = 0): Promise<boolean> {
    const date = moment().format('YYYY-MM-DD HH:mm:ss')
    const query = `INSERT INTO ${businessTable} (table_name, db_name, pkgid, create_time, create_user_id, type) VALUES ('${tableName}', '${datadb}', 2, '${date}', null, ${type})`
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

export async function getPkgInfo(pkgName?: string): Promise<any[]> {
    let con = ``
    if(pkgName !== undefined) con = `WHERE bp.name='${pkgName}'`
    const query = `SELECT bp.name as pkgName, bt.table_name as tableName, bt.type FROM ${businessPkg} bp LEFT JOIN ${businessTable} bt ON bp.id=bt.pkgid ${con}`
    const res: any = await db.sysQuery(query)
    return res[0]
}