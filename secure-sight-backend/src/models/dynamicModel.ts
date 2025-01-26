import mongoose from "mongoose";
const Schema = mongoose.Schema;
const dynamicSchema = new Schema({}, { versionKey: false, strict: false, minimize: false })

export const dynamicModelWithDBConnection = (dbName: string, collectionName: string) => {
    let dynamicModels: any = {}
    const url = `${process.env.mongo_base_url}/${dbName}`
    // const url = `${process.env.mongo_base_url}/${dbName}?authSource=admin&authMechanism=SCRAM-SHA-256`
    let connection = mongoose.createConnection(url, { maxPoolSize: 10 })
    connection.once('open', () => {
        console.log(`Mongodb (${dbName}) called the (${collectionName}) collection!`)
    })
    if (!(collectionName in dynamicModels)) {
        dynamicModels[collectionName] = connection.model(collectionName, dynamicSchema, collectionName)
    }
    return dynamicModels[collectionName]
}

// let dynamicModels: any = {};
// export const dynamicModel = (collectionName: string) => {
//     if (!(collectionName in dynamicModels)) {
//         dynamicModels[collectionName] = mongoose.model(collectionName, dynamicSchema, collectionName);
//     }
//     return dynamicModels[collectionName];
// }