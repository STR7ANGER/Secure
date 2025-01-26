import bcryptjs from 'bcryptjs'
import { UserProps } from '../../types/types'
import { dynamicModelWithDBConnection } from '../../models/dynamicModel'
// import { createUpdateClientDb, updateDbName } from '../../utils/tenantUtil'
import { COLLECTIONS, OTHER } from '../../constant'

class UserController {

    async generatePassword(query: any) {
        return new Promise(resolve => {
            bcryptjs.genSalt(10, async (_err: any, salt: string) => {
                bcryptjs.hash(query.password, salt, async (err2, hash) => {
                    if (err2) {
                        resolve("")
                    } else {
                        resolve(hash)
                    }
                })
            })
        })
    }

    async addUpdateUser(params: any) {
        return new Promise(async resolve => {
            let query = { ...params.query, tenantCode: params.info.tenantCode, dbName: params.info.dbName }, info = params.info
            let dm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.USERS)
            const password = await this.generatePassword(query)
            query = { ...query, password, role: OTHER.ROLE3, updated_at: new Date() }
            if (query.check === "add") {
                const user = await dm.findOne({ email: query.email })
                if (!user) {
                    const doc = new dm({ ...query, created_at: new Date() })
                    await doc.save()
                    resolve({ msg: `${query.email} created successfully`, error: false })
                } else {
                    resolve({ msg: `${query.email} already exist!`, error: true })
                }
            } else {
                await dm.findOneAndUpdate({ email: query.email }, { $set: query })
                resolve({ msg: `Updated successfully!`, error: false })
            }
            resolve(params)
        })
    }

    async userList(params: any) {
        return new Promise(resolve => {
            // const page = parseInt(params.info.page)
            // const limit = parseInt(params.info.limit)
            // const startIndex = (page - 1) * limit;
            // .skip(startIndex).limit(limit)
            let dm = dynamicModelWithDBConnection(params.info.dbName, COLLECTIONS.USERS)
            resolve(dm.find({ role: "user" }).lean())
        })
    }

    async deleteUser(params: any) {
        return new Promise(resolve => {
            let dm = dynamicModelWithDBConnection(params.dbName, COLLECTIONS.USERS)
            let user = dm.findOne({ tenantCode: params.tenantCode , email:params.email}).lean()
            if (user) {
                resolve(user.deleteOne({role:"user"}))
            } else {
                resolve({ msg: "User not present" })
            }
        })
    }
}

export default new UserController()
