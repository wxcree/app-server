import { ObjectId } from 'mongodb';
import db from '../dbConfigs';
import md5 from 'md5';

async function test () {
    await db.dbConnection();
    // const a = await db.find('test',{_id:new ObjectId('625ebda636d2753d22492b26')})
    // const arr = await a.toArray();
    // console.log(JSON.stringify(arr[0]));
    db.insertOne('users', {
        username: 'wxc',
        password: md5('123456')
    })
}

test();