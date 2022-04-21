import { ObjectId } from 'mongodb';
import db from '../dbConfigs';
import md5 from 'md5';
import { pkgAdd } from '../models/pkg';

async function test () {
    await db.dbConnection();
    const collection = 'test';
    const query = {_id:new ObjectId('625ebda636d2753d22492b26')};
    const option:any = {$push: {"items": ['123','333']}}
    //const a = await db.find('test',{_id:new ObjectId('625ebda636d2753d22492b26')})
    //db.insertMany(collection, query, option);
    //const arr = await a.toArray();
    //console.log(JSON.stringify(arr[0]));
    //console.log(await pkgAdd({pkgName:'Kimchi', tableName:'test12'}));
    //console.log(new Document("author", 'name').append("body", 'body').append("email", 'email'))
}
test();