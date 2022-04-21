import { IPkgGetFrom, IPkgGetRet, IPkgSetFrom, IPkgAddFrom } from '../domain/IDatapkg';
import db from '../dbConfigs'
import { IRet } from '../domain/IBase';

async function getPkgs(content: IPkgGetFrom): Promise<IPkgGetRet> {
    const { pkgName } = content;
    let data: any[] = [];
    let query = {};
    if (pkgName == undefined) {
        query = {};
    } else {
        query = {
            pkgName: pkgName
        };
    }
    const res = await db.find('datapkg', query);
    res.project({ _id: 0 });
    data = (await res.toArray());

    const ret: IPkgGetRet = {
        code: 0,
        message: 'success',
        data: data
    }
    return ret;
}

async function setPkgs(content: IPkgSetFrom): Promise<IRet> {
    const { pkgName } = content;
    if (pkgName == undefined) {
        const ret: IRet = {
            code: 1,
            message: 'fail',
        }
        return ret;
    }

    db.insertOne('datapkg', { pkgName: pkgName, tables: [] });
    const ret: IRet = {
        code: 0,
        message: 'success',
    }
    return ret;
}

async function delPkgs(content: IPkgSetFrom): Promise<IRet> {
    // TODO: 删除包
    const { pkgName } = content;
    if (pkgName == undefined) {
        const ret: IRet = {
            code: 1,
            message: 'fail',
        }
        return ret;
    }

    const ret: IRet = {
        code: 0,
        message: 'success',
    }
    return ret;
}

async function pkgAdd(content: IPkgAddFrom): Promise<IRet> {
    const { pkgName, tableName } = content;
    if (pkgName == undefined || tableName == undefined) {
        const ret: IRet = {
            code: 1,
            message: 'fail',
        }
        return ret;
    }
    // TODO: 重复名字添加识别
    const updateDocument: any = {
        $push: { "tables": tableName }
    };
    const res = await db.update(
        'datapkg',
        { pkgName: pkgName },
        updateDocument
    )
    // res.push({
    //     'tables': tableName
    // });
    const ret: IPkgGetRet = {
        code: 0,
        message: 'success',
        data: []
    }
    return ret;
}

async function pkgDel(content: IPkgGetFrom): Promise<IPkgGetRet> {
    // TODO: 从包中删除tables
    const { pkgName } = content;

    const ret: IPkgGetRet = {
        code: 0,
        message: 'success',
        data: []
    }
    return ret;
}

export {
    getPkgs,
    setPkgs,
    delPkgs,
    pkgAdd,
    pkgDel,
}