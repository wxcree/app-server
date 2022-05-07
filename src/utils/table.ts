import moment from "moment"
import { businessTable, tableColumns } from "../configs"
import db from '../dbConfigs'

interface IColums {
    name: string
    type: string
}

export function getColumns(data: any[]): IColums[] {
    const test = data[0]
    const ret: IColums[] = []
    for (const i in test) {
        ret.push({
            name: i,
            type: typeof test[i]
        })
    }
    return ret
}
// CREATE TABLE IF NOT EXISTS `business_tables`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `table_name` VARCHAR(255) NOT NULL,
//     `db_name` VARCHAR(255) NOT NULL,
//     `type` integer NOT NULL,                                  # 1:原始数据集 2：用户自建数据集
//     `create_time` DATETIME,
//     `create_user_id` INTEGER,
//     PRIMARY KEY ( `id` )
//  )ENGINE=InnoDB DEFAULT CHARSET=utf8;
export function getDDL(tableName: string, columns: IColums[]): string {
    const header = `CREATE TABLE IF NOT EXISTS \`${tableName}\`(\
                    id INT UNSIGNED AUTO_INCREMENT,`
    const content = columns.map(i => {
        const con = i.type == 'string' ? `VARCHAR(255) NOT NULL` : `integer NOT NULL`
        return ` \`${i.name}\` ${con} `
    })
    const foot = ` ,PRIMARY KEY ( \`id\` ) \
                  )ENGINE=InnoDB DEFAULT CHARSET=utf8;`
    return header + content + foot
}

// INSERT INTO dataset.testTable (province, city, type, price) VALUES ('haha', '123', '123', '123')
export function getInserts(tableName: string, columns: IColums[], data: any[]): string[] {
    const ret: string[] = []
    for (const i in data) {
        const values = []
        const col = []
        for (const j in columns) {
            if (columns[j].type == 'string')
                values.push(`'${data[i][columns[j].name] == undefined ? '' : data[i][columns[j].name]}'`)
            else
                values.push(data[i][columns[j].name] == undefined ? 0 : data[i][columns[j].name])
            col.push(`\`${columns[j].name}\``)
        }
        ret.push(`INSERT INTO \`${tableName}\` ` + `(${col})` + ` VALUES ` + `(${values});`)
    }
    return ret
}

export async function insertTableData(tableName: string, data: any[]): Promise<number> {
    const col = getColumns(data)
    const res = getDDL(tableName, col)

    // 创建表
    await db.dataQuery(res)
    const ins = getInserts(tableName, col, data)

    let ret = 0
    // 插入数据
    insertColumnsByName(tableName, col)
    for (const i in ins) {
        try {
            await db.dataQuery(ins[i])
            ret += 1
        } catch (e) {
            ret += 0
        }
    }
    return ret
}

export async function getTableId(pkgName: string): Promise<number> {
    const query = `SELECT id FROM ${businessTable} WHERE table_name='${pkgName}'`
    const res: any = await db.sysQuery(query)
    if(res[0][0] === undefined)return 0
    const ret = res[0][0]['id']
    return ret
}

export async function insertColumnsByName(tableName: string, columns: IColums[]): Promise<boolean> {
    const id = await getTableId(tableName)
    return await insertColumnsById(id, columns)
}

export async function insertColumnsById(tableId: number, columns: IColums[]): Promise<boolean> {
    const date = moment().format('YYYY-MM-DD HH:mm:ss')
    let ret = true
    try {
        for (const j in columns) {
            const query = `INSERT INTO ${tableColumns} (table_id, column_name, column_alias, type, create_time, create_user_id, edit_time) \
                                                VALUES (${tableId}, '${columns[j].name}', '${columns[j].name}', '${columns[j].type}', '${date}', null, null)`
            await db.sysQuery(query)
        }
    } catch (e) {
        console.log('insertCol fail')
        ret = false
    }
    return ret
}

export async function getTableData(tableName: string, cloumns?: string[], values?: string[]): Promise<any[]> {
    const dQuery = `SELECT * FROM \`${tableName}\``
    try{
        const res: any = await db.dataQuery(dQuery)
        return res[0]
    }catch(e){
        // console.log(e)
        console.log('get table data fail')
    }
    return []
}

export async function getTableMutiData(tableName: string, columns: string[], values?: string[], method = 'SUM'): Promise<any[]>{
    let con1 = ''
    let con2 = ''
    columns = columns.map(i => `\`${i}\``)
    if(values != undefined){
        values = values.map(i => `\`${i}\``)
        con2 += ',' + values.map(i => `${method}(${i}) as ${i}`)
        con1 += ` GROUP BY ${columns}`
    }
    const dQuery = `SELECT ${columns} ${con2} FROM \`${tableName}\` ${con1}`
    try{
        const res: any = await db.dataQuery(dQuery)
        return res[0]
    }catch(e){
        console.log(e)
        console.log('get table mutil data fail')
    }
    return []
}

export async function createView(source:string, targat: string, columns: string[], values?: string[], method = 'SUM'): Promise<boolean> {
    let con1 = ''
    let con2 = ''
    columns = columns.map(i => `\`${i}\``)
    if(values != undefined){
        values = values.map(i => `\`${i}\``)
        con2 += ',' + values.map(i => `${method}(${i}) as ${i}`)
        con1 += ` GROUP BY ${columns}`
    }
    const dQuery = `CREATE VIEW \`${targat}\` AS SELECT ${columns} ${con2} FROM \`${source}\` ${con1}`
    console.log(dQuery)
    try{
        await db.dataQuery(dQuery)
    }catch(e){
        console.log(e)
        console.log('get table mutil data fail')
        return false
    }
    return true
}

export async function getTableInfo(tableName: string): Promise<IColums[]> {
    const dQuery = `SELECT column_name as name, c.type FROM ${tableColumns} c JOIN ${businessTable} t WHERE t.table_name='${tableName}'`
    const res: any = await db.sysQuery(dQuery)
    return res[0]
}