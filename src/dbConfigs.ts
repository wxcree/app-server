import { Db, Document, Filter, FindOptions, MongoClient, OptionalId, UpdateFilter } from 'mongodb';
import mongoose,{ mongo } from 'mongoose';
import {configs} from './configs';
import {IConfigs} from "./domain/IConfigs";

class Database {
    private readonly _config: IConfigs;
    private db: Db|null;

    constructor(config: IConfigs) {
        this._config = config;
        this.db = null;
    }

    async dbConnection() {
        const {mongodb: {url, port, dbname, password, username}} = this._config;
        const mongoURL = (username && password)
            ? `mongodb://${username}:${password}@${url}:${port}`
            : `mongodb://${url}:${port}`;
        const client = await MongoClient.connect(mongoURL);
        console.log('[+] database connected')
        this.db = client.db(dbname);
        return client.db(dbname);
    }

    async getdb(){
        if(this.db != null)return this.db;
        else return await this.dbConnection();
    }

    async insertOne(collection:string, doc:OptionalId<Document>){
        (await this.getdb()).collection(collection).insertOne(doc);
    }

    async insertMany(collection:string, doc:OptionalId<Document>[]){
        (await this.getdb()).collection(collection).insertMany(doc);
    }
    
    //filter: Filter<TSchema>, options?: FindOptions): FindCursor<WithId<TSchema>>
    async find(collection:string, filter?: Filter<Document>, options?: FindOptions<Document>) {
        if(filter != undefined)
            return (await this.getdb()).collection(collection).find(filter, options)
        return (await this.getdb()).collection(collection).find({})
    }

    async update(collection:string, filter: Filter<Document>, update: UpdateFilter<Document>){
        return (await this.getdb()).collection(collection).updateMany(filter, update)
    }
}

export default new Database(configs);
