import {ITest} from "../domain/ITest";
import Database from '../dbConfigs';
import mysql from 'mysql2/promise'
import { getColumns, getDDL, getInserts, getTableData, getTableId, getTableInfo } from "../utils/table";
import { getPkgId, getPkgInfo, insertPkg } from "../utils/pkg";
// import {Schema, model} from "mongoose";

// //const {mongo: {model}} = Database;

// const TestSchema: Schema<ITest> = new Schema<ITest>({text: {type: String, required: true}});

async function test(){
  // // create the connection
  // const connection = await mysql.createConnection({host:'127.0.0.1', port:33066, user: 'root', password: 'mariamariamaria',database: 'sysdb'});
  // // query database
  // const [rows, fields] = await connection.execute('SELECT t.* FROM sysdb.business_pkg t')
  // console.log(rows)
  // console.log(fields[1].name)

  const test: {[key: string]: string|number} = {name: 'hahaha', password: '123123', age: 21}
  // const ret = []
  // for(const i in test){
  //   console.log(i)
  //   console.log(typeof test[i])
  //   ret.push({
  //     name: i,
  //     type: typeof test[i]
  //   })
  // }
  // console.log(ret)
  await Database.dbConnection()
  const test1 = [
    {
      "province": "浙江",
      "city": "杭州",
      "type": "笔",
      "price": 1
    },
    {
      "province": "浙江",
      "city": "杭州",
      "type": "纸张",
      "price": "2"
    },
    {
      "province": "浙江",
      "city": "舟山",
      "type": "笔",
      "price": "2"
    },
    {
      "province": "浙江",
      "city": "舟山",
      "type": "纸张",
      "price": "0.5"
    },
    {
      "province": "吉林",
      "city": "丹东",
      "type": "笔",
      "price": "3"
    },
    {
      "province": "吉林",
      "city": "丹东",
      "type": "纸张",
      "price": "2"
    },
    {
      "province": "吉林",
      "city": "白山",
      "type": "笔",
      "price": "4"
    },
    {
      "province": "吉林",
      "city": "白山",
      "type": "纸张",
      "price": "1"
    },
    {
      "province": "浙江",
      "city": "杭州",
      "type": "笔",
      "price": "1"
    },
    {
      "province": "浙江",
      "city": "杭州",
      "type": "纸张",
      "price": "2"
    },
    {
      "province": "浙江",
      "city": "舟山",
      "type": "笔",
      "price": "2"
    },
    {
      "province": "浙江",
      "city": "舟山",
      "type": "纸张",
      "price": "0.5"
    },
    {
      "province": "吉林",
      "city": "丹东",
      "type": "笔",
      "price": "3"
    },
    {
      "province": "吉林",
      "city": "丹东",
      "type": "纸张",
      "price": "2"
    },
    {
      "province": "吉林",
      "city": "白山",
      "type": "笔",
      "price": "4"
    },
    {
      "province": "吉林",
      "city": "白山",
      "type": "纸张",
      "price": "1"
    },
  
    {
      "province": "浙江",
      "city": "杭州",
      "type": "笔",
      "cost": "0.5"
    },
    {
      "province": "浙江",
      "city": "杭州",
      "type": "纸张",
      "cost": "1.5"
    },
    {
      "province": "浙江",
      "city": "舟山",
      "type": "笔",
      "cost": "1.5"
    },
    {
      "province": "浙江",
      "city": "舟山",
      "type": "纸张",
      "cost": "0.2"
    },
    {
      "province": "吉林",
      "city": "丹东",
      "type": "笔",
      "cost": "2"
    },
    {
      "province": "吉林",
      "city": "丹东",
      "type": "纸张",
      "cost": "1"
    },
    {
      "province": "吉林",
      "city": "白山",
      "type": "笔",
      "cost": "3"
    },
    {
      "province": "吉林",
      "city": "白山",
      "type": "纸张",
      "cost": "0.5"
    }]
  const col = getColumns(test1)
  const ret = getDDL('testTable',col)
  Database.dataQuery(ret)
  const ins = getInserts('testTable', col, test1)
  // console.log(ins)
  // for(const i in ins)
  //   Database.dataQuery(ins[i])
  // const i = await insertPkg('test')
  // await getPkgId('test')
  getTableData('testTable')
  getTableInfo('testTable')
  getPkgInfo()
  const id = await getTableId('1231231')
  console.log(id)
}

test()

