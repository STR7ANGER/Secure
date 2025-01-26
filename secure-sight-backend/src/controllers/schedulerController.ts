import { schedule } from 'node-cron'
import { SchedulingSchema } from './../helper/cron.helper'
import { emailPayload } from './../helper/email.helper'
import cronScheduler from '../helper/cron.helper'
import mongoose from 'mongoose'
import { dynamicModelWithDBConnection } from '../models/dynamicModel'
import { OTHER, COLLECTIONS } from '../constant'

const mainDb = process.env.mongo_db || ''

class schedulerController {
	async scheduleMail(params: any) {
		return new Promise(async (resolve, reject) => {
			try {
				let response
				const { emailData, schedulingTime, userId, reportIds, dbName }: any =
					params

				const dm = await dynamicModelWithDBConnection(
					mainDb,
					COLLECTIONS.SCHEDULER,
				)

				let uid = new mongoose.Types.ObjectId(userId)

				let reportObjectIds = reportIds.map(
					(id: any) => new mongoose.Types.ObjectId(id),
				)

				const userScheduleData = {
					userId: uid,
					reportIds: reportObjectIds,
					isScheduleActive: true,
					mailData: emailData,
					schedule: schedulingTime,
					dbName: dbName,
					createdAt: new Date(),
					updatedAt: new Date(),
				}

				const doc = await dm(userScheduleData)
				await doc.save()

				if (doc) {
					response = {
						success: true,
						status: 200,
						msg: `email scheduled successfully`,
					}
					resolve(response)
					return
				} else {
					response = { success: false, status: 404, msg: `email not scheduled` }
					resolve(response)
					return
				}
			} catch (e: any) {
				let response = {
					success: false,
					status: 500,
					msg: e?.message || 'internal server error',
				}
				resolve(response)
				return
			}
		}).catch((e) => {
			let response = {
				success: false,
				status: 500,
				msg: e?.message || 'internal server error',
			}
			return Promise.reject(response)
		})
	}
}

export default new schedulerController()
