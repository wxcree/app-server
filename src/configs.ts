import {IConfigs} from "./domain/IConfigs";

// 部署新环境记得更改密码
export const configs: IConfigs = {
    url: '192.168.1.126',
    port: 33066,
    // username: 'admin',
    // password: 'wxchahaha',
    username: 'root',
    password: 'mariamariamaria',
    dbname: 'sysdb',
    dataset: 'dataset'
}

export const businessPkg = 'business_pkg'
export const businessTable = 'business_tables'
export const datadb = 'dataset'
export const tableColumns = 'table_columns'