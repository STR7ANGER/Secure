import { schedule, getTasks, validate } from 'node-cron'
import fs from 'fs'
import { sendEmail } from './email.helper'
import { emailPayload } from './email.helper'
import { dynamicModelWithDBConnection } from '../models/dynamicModel'
import { COLLECTIONS } from '../constant'
import { convertArrayToCSV } from 'convert-array-to-csv'
import { Parser } from 'json2csv'
import { userInfo } from 'os'
import child_process from 'child_process'
import mongoose from 'mongoose'
import { jsonFlattenObject } from './reports.helper'
const path = require('path')
import decompress from 'decompress'

let scheduledControllerDB: any = {}

const mainDb = process.env.mongo_db || ''

export interface SchedulingSchema {
	minutes?: number
	hours?: number
	days?: number
	months?: number
	dayOfWeek?: number
	isSpecificDateAndTime?: boolean | undefined
}

class cronScheduler {
	schedule: any

	private convertNumberIntoCronExpressionByDate = (
		typeOfCron: number | undefined | null,
	) => {
		if (typeOfCron !== 0 && typeOfCron !== null && typeOfCron !== undefined) {
			return typeOfCron
		} else {
			return '*'
		}
	}
	private timeToCronStarConvert = (typeOfCron: number | undefined | null) => {
		if (typeOfCron !== 0 && typeOfCron !== null && typeOfCron !== undefined) {
			return '*/' + typeOfCron
		} else {
			return '*'
		}
	}

	private dateTimeToCronTime = (
		minutes: number,
		hours: number,
		days: number,
		months: number,
		dayOfWeek: number,
	): string => {
		let m = this.convertNumberIntoCronExpressionByDate(minutes)
		let h = this.convertNumberIntoCronExpressionByDate(hours)
		let d = this.convertNumberIntoCronExpressionByDate(days)
		let month = this.convertNumberIntoCronExpressionByDate(months)
		let weekDay = this.convertNumberIntoCronExpressionByDate(dayOfWeek)

		if (days > 0 && hours === 0) {
			h = '0'
			if (minutes === 0) {
				m = '0'
			}
		}
		if (hours > 0 && minutes === 0) {
			m = '0'
		}

		return `${m + ' ' + h + ' ' + d + ' ' + month + ' ' + weekDay}`
	}

	private timeToCron = (
		minutes: number,
		hours: number,
		days: number,
		months: number,
		dayOfWeek: number,
	): string => {
		let m = this.timeToCronStarConvert(minutes)
		let h = this.timeToCronStarConvert(hours)
		let d = this.timeToCronStarConvert(days)
		let month = this.timeToCronStarConvert(months)
		let weekDay = this.timeToCronStarConvert(dayOfWeek)

		return `${m + ' ' + h + ' ' + d + ' ' + month + ' ' + weekDay}`
	}

	async sendMailFn({
		id,
		emailData,
		schedulingTime,
		reportIds,
		dbName,
	}: {
		id: string
		emailData: emailPayload
		schedulingTime: SchedulingSchema
		reportIds: any[]
		dbName: string
	}) {
		const minutes = schedulingTime.minutes || 0
		const hours = schedulingTime.hours || 0
		const days = schedulingTime.days || 0
		const months = schedulingTime.months || 0
		const dayOfWeek = schedulingTime.dayOfWeek || 0

		const dmReport = await dynamicModelWithDBConnection(
			dbName,
			COLLECTIONS.REPORT,
		)

		const dmScheduler = await dynamicModelWithDBConnection(
			mainDb,
			COLLECTIONS.SCHEDULER,
		)

		let cronExpression: string

		if (schedulingTime.isSpecificDateAndTime === true) {
			cronExpression = this.dateTimeToCronTime(
				minutes,
				hours,
				days,
				months,
				dayOfWeek,
			)
		} else {
			cronExpression = this.timeToCron(minutes, hours, days, months, dayOfWeek)
		}

		const json2csvParser = new Parser()

		const abc = schedule(
			cronExpression,
			async () => {
				reportIds = [...new Set(reportIds)]
				for (const reportId of reportIds) {
					let attachments = []
					let report = await dmReport.findOne({ _id: reportId }).lean()
					if (!report) {
						await dmScheduler.findOneAndUpdate(
							{ _id: id },
							{
								$set: {
									isScheduleActive: false,
								},
							},
						)
					}
					if (report.type === 'report') {
						const reports = await dmReport.find({report_id: String(reportId)}).lean()
						if (reports.length > 0) {
							reports.forEach((dRep: any) => {
								const data = dRep.data

								if (data.length > 0) {
									const flattenData = jsonFlattenObject(data)
									const csvFromArrayOfObjects = json2csvParser.parse(flattenData)
									let attachment = {
										filename: `${String(dRep.title)}.csv`,
										content: csvFromArrayOfObjects,
									}
									attachments.push(attachment)					
								}
							})
						} else {
							if (!report) {
								let updateReport = await dmScheduler.findOneAndUpdate(
									{ _id: id },
									{
										$set: {
											isScheduleActive: false,
										},
									},
								)
							}
						}
					} else {
						const data = report.data
						if (data.length > 0) {
							const csvFromArrayOfObjects = json2csvParser.parse(data)
							attachments.push({
								filename: `${String(report._id)}.csv`,
								content: csvFromArrayOfObjects,
							})
						}
					}

					if (attachments.length > 0) {
						const finalMailData = { ...emailData, attachments: attachments }
						await sendEmail(finalMailData)						
					}
				}
			},
			{ scheduled: true },
		)

		abc.start()
	}

	constructor() {
		this.schedule = schedule(
			'* * * * *',
			async () => {
				const dmScheduler = await dynamicModelWithDBConnection(
					mainDb,
					COLLECTIONS.SCHEDULER,
				)
				const schedulers = await dmScheduler.find().lean()
				schedulers.forEach((sc: any) => {
					if (sc.isScheduleActive === true) {
						const mailData = {
							id: sc._id,
							emailData: sc.mailData,
							schedulingTime: sc.schedule,
							reportIds: sc.reportIds,
							dbName: sc.dbName,
						}

						this.sendMailFn(mailData)
					}
				})
			},
			{ scheduled: false },
		)
	}
}

export const connectorTestScheduler = async (response: any, data: any) => {
	const presentWorkingDir: any = process.env.PWD
	const serverPath = path.resolve(
		presentWorkingDir,
		`../secure-sight-scheduler/server`,
		// `../orion-scheduler/server`,
	)

	console.log('connector scheduler start!!')

	try {
		let { minute, hour, date, day, repeat, connectorId, userId, dbName } =
			response

		const dbConnection = await dynamicModelWithDBConnection(
			dbName,
			COLLECTIONS.CONNECTOR_CONFIG,
		)

		const config_data = await dbConnection
			.findOne({ connectorId: new mongoose.Types.ObjectId(connectorId) })
			.lean()

		let { connectorBasePath, config, connectorFileNameWithExtension } =
			config_data

		let argsList: any[] = []

		Object.keys(config).forEach((keyOfSecretData) => {
			const { type, position, isPathArg } = config[keyOfSecretData]
			argsList[position] = isPathArg=='true'
				? `${serverPath}/${connectorBasePath}/${data[0][keyOfSecretData]}`
				: data[0][keyOfSecretData]
		})
		let schedulingString: string = ''

		if (repeat.toLowerCase() == 'hourly') {
			schedulingString = `0 * * * *`
		} else if (repeat.toLowerCase() == 'daily') {
			schedulingString = `${minute} ${hour} * * *`
		} else if (repeat.toLowerCase() == 'weekly') {
			schedulingString = `${minute} ${hour} * * ${day}`
		} else if (repeat.toLowerCase() == 'monthly') {
			schedulingString = `${minute} ${hour} ${date < 1 ? 1 : date} * *`
		} else if (repeat.toLowerCase() == 'minute') {
			schedulingString = `*/${minute < 1 ? 1 : minute} * * * *`
		} else {
			schedulingString = `0 */23 * * *`
		}

		let argsOfConnector = argsList.join(' ').trim()
		let command = `python3 ${serverPath}/${connectorBasePath}/${connectorFileNameWithExtension} ${argsOfConnector} > ${serverPath}/${connectorBasePath}.log`
		// let command = `python3 ${serverPath}/${connectorBasePath}/${connectorFileNameWithExtension} ${argsOfConnector} > ${serverPath}/cron.log 2>&1`
		let zipFilePath = path.join(serverPath, connectorBasePath + `.zip`)
		console.log("-------------------the connetor main file is being executed-----------------")
		fs.access(
			`${serverPath}/${connectorBasePath}/${connectorFileNameWithExtension}`,
			fs.constants.F_OK,
			async (err: any) => {
				console.log('Err', err)
				if(err) {
					console.log('Connector not exists trying to uncompress....')
					await decompress(zipFilePath, path.join(serverPath, connectorBasePath))
					console.log(`unzipped the ${connectorBasePath}`)
				}
				
				// need to enable for scheduling
				// const job = schedule(
				// 	schedulingString,
				// 	() => {
				// 		console.log('starting... the job')
				// 		child_process.exec(command, {}, (err, stdout, stderr) => {
				// 			console.log(err, stdout, stderr)
				// 			console.log('job running completed')
				// 		})
				// 	}
				// )
				// scheduledControllerDB[connectorId] = job
				child_process.exec(command, {}, (err, stdout, stderr) => {
					console.log(err, stdout, stderr)
					console.log('job running completed')
				})
				console.log('***Connector scheduled!***')
				// job.start()
				return true
			},
		)
	} catch (e: any) {
		console.log('Error ::', e.message)
	}
}

export const stopTestConnectorScheduler = async (connectorId: string) => {
	let job = scheduledControllerDB[connectorId]
	if (job) {
		job.stop()
		return true
	}
	return false
}

export default cronScheduler
