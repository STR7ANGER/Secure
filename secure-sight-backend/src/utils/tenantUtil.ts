const fs = require('fs')
const path = require('path')
import mongoose from 'mongoose'
import { TenantProps } from '../types/types'
import UserSchema from '../models/client/user'
import { OTHER, COLLECTIONS } from '../constant/index'
import { dynamicModelWithDBConnection } from '../models/dynamicModel'

export const updateDbName = (params: TenantProps) => {
    let dbName = params.companyName.toLowerCase().replace(/\s+/g, '')
    return { ...params, dbName }
}

export const createDynamicConnection = (obj: any) => {
    const url: string = `${process.env.mongo_base_url}/${obj.dbName}` || ""
    // const url = `${process.env.mongo_base_url}/${obj.dbName}?authSource=admin&authMechanism=SCRAM-SHA-256`
    return mongoose.createConnection(url)
}

export const createUpdateClientDb = async (obj: TenantProps) => {
    const connection = createDynamicConnection(obj)
    const userModel = connection.model('users', UserSchema)
    const doc = {
        ...obj,
        fullName: "",
        email: `tenant@${obj.domain}`,
        password: process.env.default_tenant_email_password,
        role: OTHER.ROLE2
    }
    const query = { tenantCode: doc.tenantCode, email: doc.email, role: doc.role }
    const user = await userModel.findOne(query)
    if (!user) {
        const model = new userModel(doc)
        await model.save()
    } else {
        await userModel.findOneAndUpdate(query, doc)
    }
}

export const shareDefaultConnectors = async (obj: {
    companyName: string,
    tenantCode: string,
    industry: string,
    hqLocation: string,
    domain: string,
    check: string,
    dbName: string
}, info: {
    role: string,
    tenantCode: string,
    email: string,
    dbName: string
}) => {
    return new Promise(async resolve => {
        const master = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.CONNECTOR)
        let arr = await master.find({ role: info.role, email: info.email, dbName: info.dbName, type: "default" }, { _id: 0 }).lean()

//const localDirPath: string = path.resolve(process.env.PWD, `../../connector_storage/${obj.dbName}/tenant@${obj.domain}`)
        const tenant_connector = arr.map((val: any, index: number) => ({
            ...val,
            role: OTHER.ROLE2,
            email: `tenant@${obj.domain}`,
            dbName: obj.dbName,
     //       tenantFilePath: localDirPath
        }))
        const tenant = dynamicModelWithDBConnection(obj.dbName, COLLECTIONS.CONNECTOR)
        for (let index in tenant_connector) {
            const obj2 = tenant_connector[index]
            const query = { email: obj2.email, display_name: obj2.display_name, role: OTHER.ROLE2, dbName: obj2.dbName }
            const res = await tenant.findOne(query)
            if (!res) {
                const doc = new tenant(obj2)        
                await doc.save()
            } else {
                tenant.findOneAndUpdate(query, { $set: obj2 })
            }
        }
        // if (!fs.existsSync(localDirPath)) {
        //     fs.mkdirSync(localDirPath, { recursive: true })
        // }
        resolve({})
    })
}
