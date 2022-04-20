import {ITest} from "../domain/ITest";
import Database from '../dbConfigs';
// import {Schema, model} from "mongoose";

// //const {mongo: {model}} = Database;

// const TestSchema: Schema<ITest> = new Schema<ITest>({text: {type: String, required: true}});

function test(param:any){
    console.log(param);
    const a:any = 123;
    return a;
}

export default test;

