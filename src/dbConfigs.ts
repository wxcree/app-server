import {configs} from './configs';
import {IConfigs} from "./domain/IConfigs";
import mysql from 'mysql2/promise'

class Database {

    private readonly _config: IConfigs;
    private sysdb: null | mysql.Pool
    private datadb: null | mysql.Pool

    constructor(config: IConfigs) {
        this._config = config
        this.sysdb = null
        this.datadb = null
        this.dbConnection()
    }

    private dbConnection() {
        const {url, port, dbname, password, username, dataset} = this._config;
        this.sysdb = mysql.createPool({
            host:url, 
            port:port, 
            user: username, 
            password: password,
            database: dbname,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        this.datadb = mysql.createPool({
            host:url, 
            port:port, 
            user: username, 
            password: password,
            database: dataset,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        console.log('============================')
        console.log('[+] database connected')
    }

    getsysdb(){
        if(this.sysdb == null)this.dbConnection();
        return this.sysdb
    }

    getdatadb(){
        if(this.datadb == null)this.dbConnection();
        return this.datadb
    }

    async sysQuery(query: string){
        return await this.getsysdb()?.execute(query);
    }

    async dataQuery(query: string){
        return await this.getdatadb()?.execute(query);
    }
    // async insertOne(collection:string, doc:OptionalId<Document>){
    //     (await this.getdb()).collection(collection).insertOne(doc);
    // }

    // async insertMany(collection:string, doc:OptionalId<Document>[]){
    //     (await this.getdb()).collection(collection).insertMany(doc);
    // }
    
    // //filter: Filter<TSchema>, options?: FindOptions): FindCursor<WithId<TSchema>>
    // async find(collection:string, filter?: Filter<Document>, options?: FindOptions<Document>) {
    //     if(filter != undefined)
    //         return (await this.getdb()).collection(collection).find(filter, options)
    //     return (await this.getdb()).collection(collection).find({})
    // }

    // async update(collection:string, filter: Filter<Document>, update: UpdateFilter<Document>){
    //     return (await this.getdb()).collection(collection).updateMany(filter, update)
    // }
}

export default new Database(configs);
