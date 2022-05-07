import { IPkgGetFrom, IPkgGetRet, IPkgSetFrom, IPkgAddFrom } from '../domain/IDatapkg';
import db from '../dbConfigs'
import { IRet } from '../domain/IBase';
import { getPkgInfo, insertPkg, insertTableByName } from '../utils/pkg';

async function getPkgs(content: IPkgGetFrom): Promise<IPkgGetRet> {
    const { pkgName } = content;
    const data: any[] = [];
    const res = await getPkgInfo(pkgName)
    const tmp: any = {}
    let index = 0
    for(const i in res){
        let pkgNameIndex = tmp[res[i].pkgName]
        if(pkgNameIndex === undefined){
            data.push({
                pkgName: res[i].pkgName,
                tables: []
            })
            pkgNameIndex = index
            tmp[res[i].pkgName] = index
            index += 1
        }
        if(res[i].tableName !== null)
            data[pkgNameIndex].tables.push({tableName: res[i].tableName, type: res[i].type})
    }
    // const res = await db.find('datapkg', query);
    // res.project({ _id: 0 });
    // data = (await res.toArray());

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

    insertPkg(pkgName)
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
    await insertTableByName(pkgName, tableName)
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