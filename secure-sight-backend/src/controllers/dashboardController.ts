import { dynamicModelWithDBConnection } from '../models/dynamicModel'
import { OTHER, COLLECTIONS } from '../constant'

class dashboardController {
    async createDashboard(params: any) {
        let response;
        return new Promise(async (resolve, reject) => {
            const { info, data } = params
            const dm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.DASHBOARD);
            const getEntry = await dm.findOne({ $or: [{ dashboardName: data.dashboardName }, { dbName: info.dbName }, { tenantCode: info.tenantCode }] }).lean()
            if (getEntry && getEntry.dashboardName === data.dashboardName) {
                response = { success: false, status: 409, msg: `${data.dashboardName} dashboard is already exits` };
                resolve(response)
                return
            } else {
                const doc = new dm({ ...data, type: "dashboard", created_at: new Date(), updated_at: new Date() })
                await doc.save()
                response = { success: true, status: 200, msg: `${data.dashboardName} dashboard created successfully.` };
                resolve(response)
                return
            }
        })
    }

    async getDashboard(params: any) {
        let response;
        return new Promise(async (resolve) => {
            const dm = dynamicModelWithDBConnection(params.dbName, COLLECTIONS.DASHBOARD);
            const dashboard = await dm.find({ $and: [{ user_id: params.user_id }, { type: 'dashboard' }] }).lean();
            if (dashboard.length > 0) {
                response = { success: true, status: 200, data: dashboard, msg: `User Dashboard.` };
                resolve(response)
                return
            } else {
                response = { success: false, status: 404, msg: `User dashboard not found.` };
                resolve(response)
                return
            }
        })
    }

    async deleteDashboard(info: any) {
        let response;
        return new Promise(async (resolve) => {
            const dm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.DASHBOARD);
            const dashboard = await dm.find({ $and: [{ _id: info.id }, { user_id: info.user_id }] }).lean();
            if (dashboard.length > 0) {
                await dm.deleteOne({ "_id": info.id });
                response = { success: true, status: 200, msg: `User dashboard delete succeassfully.` };
                resolve(response)
                return
            } else {
                response = { success: false, status: 404, msg: `User dashboard not found.` };
                resolve(response)
                return
            }
        })
    }

    async addDashboardData(params: any) {
        let response;
        return new Promise(async (resolve) => {
            const { info, data } = params
            const dm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.DASHBOARD);
            const getEntry = await dm.findOne({ _id: info.dashboard_id }).lean();
            const query = { dashboard_id: info.dashboard_id, user_id: info.user_id, type: info.type, title: info.title, column:info.column, data: data.data };
            if (getEntry) {
                const doc = new dm({ ...query, created_at: new Date() })
                await doc.save();
                response = { success: true, status: 200, msg: `${info.type} created successfully`, error: false }
                resolve(response)
                return
            } else {
                response = { success: false, status: 400, msg: `(${info.type}) failed to created`, error: true }
                resolve(response)
                return
            }

        })
    }

    async getDashboardData(params: any) {
        let response;
        return new Promise(async (resolve) => {
            const { info, data } = params
            const dm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.DASHBOARD);
            const getEntry = await dm.find({ $and: [{ dashboard_id: data.dashboard_id }, { user_id: data.user_id }] }).lean();
            if (getEntry) {
                response = { success: true, status: 200, data: getEntry, msg: `Get dashboard data successfully.`, error: false }
                resolve(response)
                return
            } else {
                response = { success: false, status: 404, msg: `Dashboard data not found`, error: true }
                resolve(response)
                return
            }

        })
    }

    async deleteDashboardData(info: any) {
        let response;
        return new Promise(async (resolve) => {
            const dm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.DASHBOARD);
            const dashboard = await dm.findOneAndDelete({ $and: [{ _id: info.id }, { user_id: info.user_id }, { dashboard_id: info.dashboard_id }] }).lean();
            if (dashboard) {
                response = { success: true, status: 200, msg: `Dashboard data delete succeassfully.` };
                resolve(response)
                return
            } else {
                response = { success: false, status: 400, msg: `Failed to delete.` };
                resolve(response)
                return
            }
        })
    }

    async updateDashboard(params: any) {
        const { info, data } = params
        let response;
        return new Promise(async (resolve) => {
            const dm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.DASHBOARD)
            const dashboard = await dm.findOneAndUpdate({ _id: info.dashboard_id, user_id: info.user_id }, { $set: { dashboardName: data.dashboardName } })
            if (dashboard) {
                response = { success: true, status: 200, msg: `User dashboard name updated successfully.` };
                resolve(response)
                return
            } else {
                response = { success: false, status: 404, msg: `User dashboard not found.` };
                resolve(response)
                return
            }
        })
    }


    async updateTableTitle(params: any) {
        const { info, data } = params
        let response;
        return new Promise(async (resolve) => {
            const dm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.DASHBOARD)
            const dashboard = await dm.findOneAndUpdate({ _id: info.table_id, dashboard_id: info.dashboard_id, user_id: info.user_id }, { $set: { title: data.title } })
            if (dashboard) {
                response = { success: true, status: 200, msg: `User table name updated successfully.` };
                resolve(response)
                return
            } else {
                response = { success: false, status: 404, msg: `User table not found.` };
                resolve(response)
                return
            }
        })
    }

}
export default new dashboardController()