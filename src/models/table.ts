import db from '../dbConfigs'
import { IRet } from '../domain/IBase';
import { ITableAdd, ITableAddRet, ITableGet, ITableGetRet, ITableMutiGet, ITableViewAdd } from '../domain/ITable'
import { insertTableByName } from '../utils/pkg';
import { createView, getTableData, getTableId, getTableMutiData, insertTableData } from '../utils/table';

//{"pkgName":"Kimchi","tableName":"test","data":[
//    {"test":1},{"test":2}
//    ]}
async function addTable(req: ITableAdd): Promise<IRet> {
    const { pkgName, tableName, data, info } = req;
    if (pkgName == undefined || tableName == undefined || data.length <= 0 ) {
        const ret: ITableAddRet = {
            code: 1,
            message: 'fail',
        }
        return ret;
    }

    // 一条数据占用一个记录，使用方便，虽然结构不规范
    // for (const i in data) {
    //     data[i] = { ...data[i], tableName: tableName, pkgName: pkgName }
    // }
    // db.insertMany('tables', data);

    // 一条记录对应一个数据表，可以记录更多信息，数据主题信息更新需要考虑
    // const d = {
    //     tableName: tableName,
    //     pkgName: pkgName,
    //     data: data,
    //     info: info
    // }

    // 检测表是否已经存在
    const id = await getTableId(tableName)
    if(id != 0){
        const ret: ITableAddRet = {
            code: 1,
            message: 'table is aleady exist',
        }
        return ret;
    }

    // 向数据包表插入记录
    const res = await insertTableByName(pkgName, tableName)
    if(!res){
        const ret: ITableAddRet = {
            code: 1,
            message: 'insert table name fail',
        }
        return ret;
    }

    // 插入数据表数据
    const total = await insertTableData(tableName, data)
    if(total == 0){
        const ret: ITableAddRet = {
            code: 1,
            message: 'insert table data fail',
            data: total
        }
        return ret;
    }
    const ret: ITableAddRet = {
        code: 0,
        message: 'success',
        data: total
    }
    return ret;
}

async function addView(content: ITableViewAdd) {
    const { pkgName, tableName, viewName, columns, values } = content;
    if (pkgName == undefined || tableName == undefined || viewName == undefined || columns == undefined || columns.length == 0 ) {
        const ret: ITableAddRet = {
            code: 1,
            message: 'fail',
        }
        return ret;
    }

    // 向数据包表插入记录
    const res = await insertTableByName(pkgName, viewName, 1)
    if(!res){
        const ret: ITableAddRet = {
            code: 1,
            message: 'insert table name fail',
        }
        return ret;
    }

    // 创建视图
    const ret = await createView(tableName, viewName, columns, values)
    if(!ret){
        const ret: ITableAddRet = {
            code: 1,
            message: 'create view name fail',
        }
        return ret;
    }
    // TODO: 插入view的colums信息

    const ret1: IRet = {
        code: 0,
        message: 'success',
    }
    return ret1;
}

//{"pkgName":"Kimchi","tableName":"test"}
async function getTable(req: ITableGet): Promise<IRet> {
    const { pkgName, tableName } = req;
    if (pkgName == undefined || tableName == undefined) {
        const ret: IRet = {
            code: 1,
            message: 'fail',
        }
        return ret;
    }

    const data: any = await getTableData(tableName);
    const ret: ITableGetRet = {
        code: data.length > 0 ? 0 : 1,
        message: data.length >0 ? 'success' : 'get data fail',
        data: data
    }
    return ret;
}

async function getTableMutil(req: ITableMutiGet): Promise<IRet> {
    const { pkgName, tableName, columns, values } = req;
    if (pkgName == undefined || tableName == undefined) {
        const ret: IRet = {
            code: 1,
            message: 'fail',
        }
        return ret;
    }

    const data: any = await getTableMutiData(tableName, columns, values);
    const ret: ITableGetRet = {
        code: data.length > 0 ? 0 : 1,
        message: data.length >0 ? 'success' : 'get mutil data fail',
        data: data
    }
    return ret;
}

export {
    addTable,
    addView,
    getTable,
    getTableMutil,
}