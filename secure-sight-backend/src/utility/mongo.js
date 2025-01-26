const mockEntry = require('./mock-data/data.json')
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const dynamicSchema = new Schema({}, { versionKey: false, strict: false })

const dynamicModelWithDBConnection = (dbName, collectionName) => {
    let dynamicModels = {}
    const url =`${process.env.mongo_base_url}/${process.env.mongo_db}`
    // const url =`${process.env.mongo_base_url}/${dbName}`
    // const url = `${process.env.mongoose}/${dbName}`
    // const url =`${process.env.mongo_base_url}/${dbName}?authSource=admin&authMechanism=SCRAM-SHA-256`
    let connection = mongoose.createConnection(url, { maxPoolSize: 100 })
    connection.once('open', () => {
        console.log(`Mongodb (${dbName}) called the (${collectionName}) collection!`)
    })
    if (!(collectionName in dynamicModels)) {
        dynamicModels[collectionName] = connection.model(collectionName, dynamicSchema, collectionName)
    }
    return dynamicModels[collectionName]
}

async function enterMock() {
    let dm = dynamicModelWithDBConnection("techm", "connector")
    const doc = new dm(mockEntry)
    await doc.save()
}

enterMock()
