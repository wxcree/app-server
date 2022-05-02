import {ITest} from "../domain/ITest";
import Database from '../dbConfigs';
import mysql from 'mysql2/promise'
// import {Schema, model} from "mongoose";

// //const {mongo: {model}} = Database;

// const TestSchema: Schema<ITest> = new Schema<ITest>({text: {type: String, required: true}});

async function test(param:any){
  // create the connection
  const connection = await mysql.createConnection({host:'localhost', user: 'root', password: 'mariamariamaria',database: 'sysdb'});
  // query database
  const [rows, fields] = await connection.execute('SELECT t.* FROM sysdb.business_pkg t')
  console.log(rows)
  console.log(fields)
}

export default test;

