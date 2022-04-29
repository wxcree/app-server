import db from '../dbConfigs'
import { IRet } from '../domain/IBase';
import { ITableAdd, ITableAddRet, ITableGet, ITableGetRet } from '../domain/ITable'

//{"pkgName":"Kimchi","tableName":"test","data":[
//    {"test":1},{"test":2}
//    ]}
async function addTable(req: ITableAdd): Promise<IRet> {
    const { pkgName, tableName, data, info } = req;
    if (pkgName == undefined || tableName == undefined || data.length <= 0 || info.length <= 0) {
        const ret: ITableAddRet = {
            code: 1,
            message: 'fail',
        }
        return ret;
    }

    // 一条数据占用一个记录，使用方便，虽然结构不规范
    // for (const i in data) {
    //     data[i] = { ...data[i], _tableName: tableName, _pkgName: pkgName }
    // }
    // db.insertMany('tables', data);

    // 一条记录对应一个数据表，可以记录更多信息，数据主题信息更新需要考虑
    const d = {
        tableName: tableName,
        pkgName: pkgName,
        data: data,
        info: info
    }

    db.insertOne('tables', d);
    const ret: ITableAddRet = {
        code: 0,
        message: 'success',
    }
    return ret;
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

    const res = await db.find('tables',
        { tableName: tableName, pkgName: pkgName }
    );
    res.project({ _id: 0, _tableName: 0, _pkgName: 0});
    const data: any = await res.toArray();
    const ret: ITableGetRet = {
        code: 0,
        message: 'success',
        data: data[0]
    }
    return ret;
}

export {
    addTable,
    getTable,
}