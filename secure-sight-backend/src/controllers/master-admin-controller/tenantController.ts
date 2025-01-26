import { TenantProps, TenantInfoProps } from '../../types/types'
import { dynamicModelWithDBConnection } from '../../models/dynamicModel'
import { createUpdateClientDb, updateDbName, shareDefaultConnectors } from '../../utils/tenantUtil'
import { COLLECTIONS, OTHER } from '../../constant'
import mongoose from "mongoose";

class TenantController {

    async createUpdateTenant(params: TenantInfoProps) {
        const { info, data } = params
        const dm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.TENANT)
        const obj = updateDbName(data)
        if (data.check === "add") {
            const getEntry = await dm.findOne({ $or: [{ companyName: obj.companyName }, { dbName: obj.dbName }, { tenantCode: obj.tenantCode }] }).lean()
            if (getEntry && getEntry.companyName === data.companyName) {
                return { msg: `${data.companyName} is already exist!`, error: true }
            } else if (getEntry && getEntry.tenantCode === data.tenantCode) {
                return { msg: `Tenant code (${data.tenantCode}) is already exist!`, error: true }
            } else if (getEntry && getEntry.dbName === data.dbName) {
                return { msg: `${data.dbName} is already exist!`, error: true }
            } else {
                const doc = new dm({ ...obj, created_at: new Date(), updated_at: new Date() })
                doc.save()
                await createUpdateClientDb(obj)
                await shareDefaultConnectors(obj, info)
                return { msg: `${data.companyName} created successfully!`, error: false }
            }
        } else {
            const check2 = await dm.findOne({ dbName: obj.dbName, tenantCode: obj.tenantCode }).lean()
            await dm.findOneAndUpdate(check2, { ...obj, updated_at: new Date() })
            await createUpdateClientDb(obj)
            return { msg: `${data.companyName} info updated successfully!`, error: false }
        }
    }

    async list(_params: any) {
        return new Promise(resolve => {
            //    const page = parseInt(params.info.page)
            //     const limit = parseInt(params.info.limit)
            //     const startIndex = (page - 1) * limit;
            //     skip(startIndex).limit(limit).
            let dm = dynamicModelWithDBConnection(OTHER.MASTER_ADMIN_DB, COLLECTIONS.TENANT)
            resolve(dm.find().lean())
        })
    }

    async deleteTenant(params: any) {
        return new Promise(async (resolve, reject) => {
            let response;
            const dm = dynamicModelWithDBConnection(OTHER.MASTER_ADMIN_DB, COLLECTIONS.TENANT)
            const user = await dm.findOneAndDelete({ $and: [{ tenantCode: params.tenantCode }, { dbName: params.dbName }] }).lean()
            if (user) {
                const url = `${process.env.mongo_base_url}/${params.dbName}`
                // const url = `${process.env.mongo_base_url}/${params.dbName}?authSource=admin&authMechanism=SCRAM-SHA-256`
                const connection = mongoose.createConnection(url, { maxPoolSize: 10 })
                connection.once('open', () => {
                    console.log(`Mongodb called (${params.dbName}) database`)
                    connection.db.dropDatabase();
                })
                response = { success: true, status: 200, message: "Tenant delete successfully", error: false }
                resolve(response)
                return
            } else {
                response = { success: false, status: 400, message: "tenant are not present", error: true }
                resolve(response)
                return
            }
        })
    }
}
export default new TenantController()
