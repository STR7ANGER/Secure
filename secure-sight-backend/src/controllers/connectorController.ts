import { ConnectorProps } from '../types/types'
import { dynamicModelWithDBConnection } from '../models/dynamicModel'
import { OTHER, COLLECTIONS } from '../constant'
import { connectorTestScheduler, stopTestConnectorScheduler } from '../helper/cron.helper'
import crypto from 'crypto'
import path from 'path'
import fs from 'fs'
import mongoose from 'mongoose'
// import { createUpdateClientDb, updateDbName } from '../utils/tenantUtil'

interface ConnectorSchedulerTestDataType {
	info: {
		dbName: string
		connectorId: any
        isScheduled: boolean
	}
	data: {
		minute: any
		hour: any
		date: any
		day: any
		repeat: any
		inventory: any
		config: any
	}
}

class ConnectorController {

    async createUpdateConnector(params: ConnectorProps) {
        let query = { ...params.query, ...params.info }, info = params.info
        const dm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.CONNECTOR)
        const obj = await dm.findOne({ connectorName: query.connectorName, email: info.email })
        if (!obj) {
            const doc = new dm(query)
            await doc.save()
            return { msg: "successfully created", error: false }
        } else {
            return { msg: `${query.connectorName} already exist!`, error: true }
        }
    }

    async insertMultiConnector(params: any) {
        let info = params.info,
            _date = new Date(),
            data = params.data.map((p: any) => ({ ...info, ...p, created_at: _date, updated_at: _date })).map(({ tenantCode, ...p }: any) => p)
        const dm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.CONNECTOR)
        for (let index in data) {
            let obj = data[index]
            // const query = { email: obj.email, name: obj.name, display_name: obj.display_name, category: obj.category }
						const query = { email: obj.email, name: obj.name, display_name: obj.display_name }
            const res = await dm.findOne(query).lean()
            if (!res) {
                const doc = new dm({ ...obj, type: "default" })
                await doc.save()
            } else {
                await dm.findOneAndUpdate(query, { $set: obj })
            }
        }
        return { msg: "successfully created", error: false }
    }

    async connectorList(params: any) {
        return new Promise(async resolve => {
            // const page = parseInt(params.info.page)
            // const limit = parseInt(params.info.limit)
            // const startIndex = (page - 1) * limit;
            // .skip(startIndex).limit(limit)
            let dm = dynamicModelWithDBConnection(params.info.dbName, COLLECTIONS.CONNECTOR)
            resolve(await dm.find().lean())
        })
    }

    async activateConnector(params: any) {
        const { info, data } = params
        let dm = dynamicModelWithDBConnection(params.info.dbName, COLLECTIONS.CONNECTOR)
        await dm.findOneAndUpdate({ role: info.role, email: info.email, display_name: data.display_name }, { $set: { status: data.status, userInputs: data.userInputs } })
        return { error: false }
    }

    async shareConnector(params: any) {
        return new Promise((resolve, reject) => {
            let response;
            const { info, data } = params
            if (data) {
                params.data.map(async (p: any) => {
                    const dm = dynamicModelWithDBConnection(p.dbName, COLLECTIONS.CONNECTOR);
                    const getEntry = await dm.findOne({ connectorId: info._id }).lean();
                    const query = { connectorId: info._id, name: info.name, role: OTHER.ROLE2, display_name: info.display_name, category: info.category, config: info.config, actions: info.actions, filePath: info.filePath, email: `tenant@${p.domain}`, dbName: p.dbName, tenantCode: p.tenantCode }
                    if (!getEntry) {
                        const doc = new dm({ ...query, created_at: new Date() })
                        await doc.save();
                        response = { success: true, status: 200, msg: "Connector assign successfully.", error: false }
                        resolve(response)
                        return
                    } else {
                        response = { success: false, status: 400, msg: "Connector is already assign to Tenant.", error: true }
                        resolve(response)
                        return
                    }
                })
            } else {
                response = { msg: `Connector assign failed.`, error: true }
                resolve(response)
                return
            }
        })
    }

    async tenantDeleteConnector(params: any) {
        return new Promise(async (resolve, reject) => {
						const localDirPath = path.resolve(process.env.PWD || '', `../secure-sight-scheduler/server`)

            let response;
            const { info } = params
            const dm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.CONNECTOR);
            const connector = await dm.findOne({ _id: info.connectorId }).lean();
						const connectorDirName = crypto.createHash('md5').update(connector.email + connector.display_name).digest('hex')
            if (connector) {
                await dm.deleteOne({ _id: info.connectorId });

								const cc = dynamicModelWithDBConnection(
									info.dbName,
									COLLECTIONS.CONNECTOR_CONFIG,
								)
								await cc.deleteMany({ "connectorId": connector._id });

                const um = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.USERCONNECTOR);
                await um.deleteMany({ "connectorId": connector._id });

								try {
									await fs.promises.rm(path.join(localDirPath, connectorDirName), {
										recursive: true,
										force: true
									})
									await fs.promises.unlink(connector.filePath)
									await fs.promises.unlink(path.join(localDirPath, connectorDirName + '.log'))
								}catch(e) {
									console.log(e)
								}

                response = { success: true, status: 200, msg: `Connector delete successfully.` };
                resolve(response);
                return;
            } else {
                response = { success: false, status: 404, msg: `Connector not found` };
                resolve(response);
                return;
            }
        })
    }

    async masterDeleteConnector(params: any) {
        return new Promise(async (resolve, reject) => {
            let response;
            const { info } = params
            const dm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.TENANT);
            const tenant = await dm.find().lean();
            tenant.map(async (p: any) => {
                const bm = dynamicModelWithDBConnection(p.dbName, COLLECTIONS.USERCONNECTOR);
                await bm.deleteMany({ "connectorId": info.connectorId });
                const cm = dynamicModelWithDBConnection(p.dbName, COLLECTIONS.CONNECTOR);
                await cm.deleteMany({ "connectorId": info.connectorId });
            });
            const gm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.CONNECTOR);
            const connector = await gm.findOne({ _id: info.connectorId }).lean();
            if (connector) {
                await gm.deleteOne({ "_id": info.connectorId });
                response = { success: true, status: 200, msg: `Connector delete successfully.` };
                resolve(response);
                return;
            } else {
                response = { success: false, status: 404, msg: `Connector not found` };
                resolve(response);
                return;
            }
        })
    }

    async asignConnector(params: any) {
        return new Promise((resolve, reject) => {
            let response;
            const { info, data } = params
            if (data) {
                params.data.map(async (p: any) => {
                    const dm = dynamicModelWithDBConnection(info.dbName, COLLECTIONS.USERCONNECTOR);
                    const getEntry = await dm.findOne({ $and: [{ user_id: p._id }, { connectorId: info.connectorId }] }).lean();
                    if (!getEntry) {
                            const query = { user_id: p._id, ...info, role: OTHER.ROLE3 }
                            const doc = new dm({ ...query, created_at: new Date() })
                            await doc.save();
                            response = { success: true, status: 200, msg: "Connector assign to user successfully.", error: false }
                            resolve(response)
                            return
                    } else {
                        response = { success: true, status: 400, msg: "Connector is already asign to user.", error: true }
                        resolve(response)
                        return
                    }
                })
            } else {
                response = { msg: `Connector assign failed.`, error: true }
                resolve(response)
                return
            }
        })
    }

    async connectorListForUser(params: any) {
        return new Promise(async resolve => {
            let response;
            let dm = dynamicModelWithDBConnection(params.dbName, COLLECTIONS.USERCONNECTOR)
            const list = await dm.find({ user_id: params.user_id }).lean();
            if (list.length > 0) {
                response = { success: true, status: 200, data: list, msg: `User connector list.` };
                resolve(response)
                return
            } else {
                response = { success: false, status: 404, msg: `User connector list not found.` };
                resolve(response)
                return
            }
        })
    }

    async connectorSchedulingDataInsert(params: any) {
		type ArgType = {
			type: string
			position: number
			isPathArg: boolean
		}

		interface ConnectorConfigDataType {
			info: {
				connectorId: string
				dbName: string
				isScheduled: boolean
			}
			data: {
				config: any
				connectorBasePath: string
				connectorFileNameWithExtension: string
			}
		}
		return new Promise(async (resolve) => {
			try {
				let response
				let { info, data }: ConnectorConfigDataType = params

				if (!info || !data) {
					response = {
						success: false,
						status: 404,
						msg: `Bad Request: info & data field is missing`,
					}
					resolve(response)
					return
				}

				let { config, connectorBasePath, connectorFileNameWithExtension } = data
				if (!config || !connectorBasePath || !connectorFileNameWithExtension) {
					response = {
						success: false,
						status: 404,
						msg: `Bad Request: config, connectorBasePath && connectorFileNameWithExtension field is must include in info`,
					}
					resolve(response)
					return
				}
				const ArgType = ['type', 'position', 'isPathArg']
				Object.keys(config).forEach((configKey) => {
					ArgType.forEach((argKey) => {
						if (!Object.keys(config[configKey]).includes(argKey)) {
							response = {
								success: false,
								status: 404,
								msg: `Bad Request: ${argKey} field is must include in ${configKey}`,
							}
							resolve(response)
							return
						}
					})
				})

				const { dbName, connectorId } = info
				if (!dbName || !connectorId) {
					response = {
						success: false,
						status: 404,
						msg: `Bad Request: dbName & connectorId field is must include in info`,
					}
					resolve(response)
					return
				}

				const dbConnection = await dynamicModelWithDBConnection(
					dbName,
					COLLECTIONS.CONNECTOR_CONFIG,
				)
				const connectorModel = await dynamicModelWithDBConnection(
					dbName,
					COLLECTIONS.CONNECTOR,
				)

				const connector = await connectorModel.findOne({_id: new mongoose.Types.ObjectId(connectorId)})
				if(!connector) throw new Error('connector not found!')

				// forcing connector basepath change
				data.connectorBasePath = crypto.createHash('md5').update(connector.email + connector.display_name).digest('hex')

				const configData = {
					connectorId: new mongoose.Types.ObjectId(connectorId),
					...data,
					isConnectorScheduled: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				}

				const isConnectorConfigExist = await dbConnection
					.find({
						connectorId: new mongoose.Types.ObjectId(connectorId),
					})
					.lean()

				if (isConnectorConfigExist.length > 0) {
					const insertConfigInToCollection =
						await dbConnection.findOneAndUpdate(
							{
								connectorId: new mongoose.Types.ObjectId(connectorId),
							},
							{
								$set: { ...configData, createdAt: undefined },
							},
						)
					response = {
						success: true,
						status: 200,
						msg: `Existing connector config updated.`,
					}
					resolve(response)
					return
				} else {
					const insertConfigInToCollection = await dbConnection(configData)
					await insertConfigInToCollection.save()
					response = {
						success: true,
						status: 200,
						msg: `connector config successfully created.`,
					}
					resolve(response)
					return
				}
			} catch (e: any) {
				const response = {
					success: true,
					status: 500,
					msg: `Error: ${e.message}`,
				}
				resolve(response)
				return
			}
		})
	}

	async connectorScheduleTest(params: any) {
		return new Promise(async (resolve) => {
			let response

			let { info, data }: ConnectorSchedulerTestDataType = params

			if (!info) {
				response = {
					success: false,
					status: 404,
					msg: `Bad Request: info field is missing`,
				}
				resolve(response)
				return
			}

			const { dbName, connectorId, isScheduled } = info
			const dbConnection = dynamicModelWithDBConnection(
				dbName,
				COLLECTIONS.CONNECTOR_CONFIG,
			)
			if (isScheduled) {
				if (!data) {
					response = {
						success: false,
						status: 404,
						msg: `Bad Request: data field is missing`,
					}
					resolve(response)
					return
				}
				let paramsType = [
					'minute',
					'hour',
					'date',
					'day',
					'repeat',
					'inventory',
				]
				paramsType.forEach((paramsKeyName: string) => {
					const isKeyExists = Object.keys(data).includes(paramsKeyName)
					if (!isKeyExists) {
						response = {
							success: false,
							status: 404,
							msg: `Bad Request: Field is missing : ${paramsKeyName}`,
						}
						resolve(response)
						return
					}
				})
				const connectorData = await dbConnection
					.findOne({
						connectorId: new mongoose.Types.ObjectId(connectorId),
					})
					.lean()

				if (connectorData && connectorData.hasOwnProperty('config')) {
					let configDataKeys = Object.keys(connectorData.config)

					configDataKeys.forEach((configKey: string) => {
						const isKeyExists = Object.keys(data.config).includes(configKey)
						if (!isKeyExists) {
							response = {
								success: false,
								status: 404,
								msg: `Bad Request: Field is missing in inventory : ${configKey}`,
							}
							resolve(response)
							return
						}
					})

					let responseData = { ...info, ...data }
					let dataScheduler = [{ ...data.config }]

					const connectorModel = dynamicModelWithDBConnection(
						dbName,
						COLLECTIONS.CONNECTOR,
					)

					await connectorTestScheduler(responseData, dataScheduler)

					await connectorModel.findOneAndUpdate({
						_id: connectorId
					}, {
						$set: {
							scheduleInfo: data
						}
					})

					await dbConnection.findOneAndUpdate(
						{
							connectorId: new mongoose.Types.ObjectId(connectorId),
						},
						{
							$set: {
								isConnectorScheduled: true,
								updatedAt: new Date(),
							},
						},
					)
					response = {
						success: true,
						status: 200,
						msg: `connector successfully scheduled.`,
					}
					resolve(response)
					return
				}
			} else {
				await dbConnection.findOneAndUpdate(
					{
						connectorId: new mongoose.Types.ObjectId(connectorId),
					},
					{
						$set: {
							isConnectorScheduled: false,
							updatedAt: new Date(),
						},
					},
				)
				let isStopped = await stopTestConnectorScheduler(connectorId)
				response = isStopped
					? {
							success: true,
							status: 200,
							msg: `connector job stopped.`,
					  }
					: {
							success: true,
							status: 200,
							msg: `connector job already stopped.`,
					  }
				resolve(response)
				return
			}
			response = {
				success: false,
				status: 404,
				msg: `Bad Request: connector data not found with Id that you provide`,
			}
			resolve(response)
			return
		})
	}

	async connectorSchedulerStop(params: any) {
		return new Promise(async (resolve, reject) => {
			let response
			let { info, data }: any = params
			if (!info || !data) {
				response = {
					success: false,
					status: 404,
					msg: `Bad Request: info & data field is missing`,
				}
				resolve(response)
				return
			}
			let { dbName, connectorId, userId } = info
			const dbConnection = await dynamicModelWithDBConnection(
				dbName,
				COLLECTIONS.CONNECTOR_CONFIG,
			)
		})
	}
}

export default new ConnectorController()
