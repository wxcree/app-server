import db from '../dbConfigs'
import { IRet } from '../domain/IBase';
import { ITableAdd, ITableAddRet, ITableGet, ITableGetRet } from '../domain/ITable'

//{"pkgName":"Kimchi","tableName":"test","data":[
//    {"test":1},{"test":2}
//    ]}
async function addTable(req: ITableAdd): Promise<IRet> {
    const { pkgName, tableName, data } = req;
    if (pkgName == undefined || tableName == undefined || data.length <= 0) {
        const ret: ITableAddRet = {
            code: 1,
            message: 'fail',
        }
        return ret;
    }

    for (const i in data) {
        data[i] = { ...data[i], _tableName: tableName, _pkgName: pkgName }
    }

    db.insertMany('tables', data);
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
        { _tableName: tableName, _pkgName: pkgName }
    );
    res.project({ _id: 0, _tableName: 0, _pkgName: 0, test: 1 });
    const data: any = await res.toArray();

    const ret: ITableGetRet = {
        code: 0,
        message: 'success',
        data: data
    }
    return ret;
}

export {
    addTable,
    getTable,
}