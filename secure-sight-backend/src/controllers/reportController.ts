import { dynamicModelWithDBConnection } from '../models/dynamicModel'
import { OTHER, COLLECTIONS } from '../constant'
import {jsonFlattenObject} from '../helper/reports.helper'
import { Parser } from 'json2csv'
import mongoose from 'mongoose'

class reportController {
    async createReport(params: any) {
        let response;
        return new Promise(async (resolve, reject) => {
            const { info, data } = params
            const dm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.REPORT);
            const getEntry = await dm.findOne({ $or: [{ reportName: data.reportName }, { dbName: info.dbName }, { tenantCode: info.tenantCode }] }).lean()
            if (getEntry && getEntry.reportName === data.reportName) {
                response = { success: false, status: 409, msg: `${data.reportName} report is already exits` };
                resolve(response)
                return
            } else {
                const doc = new dm({ ...data, type: "report", created_at: new Date(), updated_at: new Date() })
                await doc.save()
                response = { success: true, status: 200, msg: `${data.reportName} report created successfully.` };
                resolve(response)
                return
            }
        })
    }

    async getReport(params: any) {
        let response;
        return new Promise(async (resolve) => {
            const dm = dynamicModelWithDBConnection(params.dbName, COLLECTIONS.REPORT);
            const report = await dm.find({ $and: [{ user_id: params.user_id }, { type: 'report' }] }).lean();
            if (report.length > 0) {
                response = { success: true, status: 200, data: report, msg: `User reports.` };
                resolve(response)
                return
            } else {
                response = { success: false, status: 404, msg: `User reports not found.` };
                resolve(response)
                return
            }
        })
    }

    async deleteReport(info: any) {
        let response;
        return new Promise(async (resolve) => {
            const dm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.REPORT);
            const report = await dm.find({ $and: [{ _id: info.id }, { user_id: info.user_id }] }).lean();
            if (report.length > 0) {
                await dm.deleteOne({ "_id": info.id });
                response = { success: true, status: 200, msg: `User report delete successfully.` };
                resolve(response)
                return
            } else {
                response = { success: false, status: 404, msg: `User report not found.` };
                resolve(response)
                return
            }
        })
    }

    async addReportData(params: any) {
        let response;
        return new Promise(async (resolve) => {
            const { info, data } = params
            const dm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.REPORT);
            const getEntry = await dm.findOne({ _id: info.report_id }).lean();
            const query = { report_id: info.report_id, user_id: info.user_id, type: "table", title: info.title, data: data.data };
            if (getEntry) {
                const doc = new dm({ ...query, created_at: new Date() })
                await doc.save();
                response = { success: true, status: 200, msg: `${info.title} table created successfully`, error: false }
                resolve(response)
                return
            } else {
                response = { success: false, status: 400, msg: `${info.title} table failed to created`, error: true }
                resolve(response)
                return
            }

        })
    }

    async getReportData(params: any) {
        let response;
        return new Promise(async (resolve) => {
            const { info, data } = params
            const dm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.REPORT);
            const getEntry = await dm.find({ $and: [{ report_id: data.report_id }, { user_id: data.user_id }] }).lean();
            if (getEntry) {
                response = { success: true, status: 200, data: getEntry, msg: `Get report data successfully.`, error: false }
                resolve(response)
                return
            } else {
                response = { success: false, status: 404, msg: `report data not found`, error: true }
                resolve(response)
                return
            }
        })
    }

    async deleteReportData(info: any) {
        let response;
        return new Promise(async (resolve) => {
            const dm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.REPORT);
            const report = await dm.findOneAndDelete({ $and: [{ _id: info.id }, { user_id: info.user_id }, { report_id: info.report_id }] }).lean();
            if (report) {
                response = { success: true, status: 200, msg: `report data delete succeassfully.` };
                resolve(response)
                return
            } else {
                response = { success: false, status: 400, msg: `Failed to delete.` };
                resolve(response)
                return
            }
        })
    }

    async updateReport(params: any) {
        const { info, data } = params
        let response;
        return new Promise(async (resolve) => {
            const dm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.REPORT)
            const report = await dm.findOneAndUpdate({ _id: info.report_id, user_id: info.user_id }, { $set: { reportName: data.reportName } })
            if (report) {
                response = { success: true, status: 200, msg: `User report name updated successfully.` };
                resolve(response)
                return
            } else {
                response = { success: false, status: 404, msg: `User report not found.` };
                resolve(response)
                return
            }
        })
    }

    async updateReportTableTitle(params: any) {
        const { info, data } = params
        let response;
        return new Promise(async (resolve) => {
            const dm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.REPORT)
            const report = await dm.findOneAndUpdate({ _id: info.table_id, report_id: info.report_id, user_id: info.user_id }, { $set: { title: data.title } })
            if (report) {
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

    
	async crossTableReport(params: any, res: any) {
		const { info, data } = params
		let response
		return new Promise(async (resolve) => {
			let user_id = info.user_id
			let reportData = data

			if (!user_id) {
				response = {
					success: false,
					status: 400,
					msg: `user_id is not provided.`,
				}
				resolve(res.status(400).json(response))
				return
			}

			let finalDataToBeConvert: any = []
			let flattenData: any = []

			if (
				reportData.length == 0 ||
				reportData == undefined ||
				reportData == null
			) {
				response = {
					success: false,
					status: 404,
					msg: `reports data is not provided.`,
				}
				res.status(404).json(response)
				resolve(res)
				return
			}
			try {
				for (let i = 0; i < reportData.length; i++) {
					let { id, dbName } = reportData[i]
					id = new mongoose.Types.ObjectId(id)
                    
					const dmReport = await dynamicModelWithDBConnection(
                        dbName,
						COLLECTIONS.REPORT,
                        )   
                        let repData = await dmReport.findOne({ _id: id, user_id }).lean()
					if (repData.type === 'table') {
						const reports = await dmReport
							.find({
								_id: String(id),
								user_id,
							})
							.lean()  
						if (reports.length > 0) {
							reports.forEach((dRep: any) => {
								const data = dRep.data
								if (data.length > 0) {
									finalDataToBeConvert = [...finalDataToBeConvert, ...data]
								}
							})
						}
					} else {
						const data = repData.data

						if (data.length > 0) {
							finalDataToBeConvert = [...finalDataToBeConvert, ...data]
						}
					}
				}
				for (let i = 0; i < finalDataToBeConvert.length; i++) {
					let flatData = await jsonFlattenObject(finalDataToBeConvert[i])
					flattenData.push(flatData)
				}

				const json2csvParser = new Parser()
				if (flattenData.length > 0) {
					// const csvFromArrayOfObjects = json2csvParser.parse(flattenData)
					// const report_data = new Date()
					// res.setHeader('Content-Type', 'json/csv')
					// let fileName = `combined_report_${Number(report_data)}.csv`
					// res.attachment(fileName)

					res.status(200).send(flattenData)

					resolve(res)
					return
				}
			} catch (err: any) {
				response = {
					success: false,
					status: 500,
					msg: String(err.message),
				}
				res.status(500).json(response)
				resolve(res)
				return
			}
		})
	}
}
export default new reportController()