import {ITest} from "../domain/ITest";
import Database from '../dbConfigs';
import mysql from 'mysql2/promise'
import { createView, getColumns, getDDL, getInserts, getTableData, getTableId, getTableInfo, getTableMutiData } from "../utils/table";
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
  const res = await createView('流水1', '流水1副本',['营业日期', '经营模式', '订单状态', '结账方式'], ['订单原价（元）', '订单收入（元）'])
  console.log(res)
}

test()

