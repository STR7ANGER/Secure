import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { dynamicModelWithDBConnection } from '../models/dynamicModel'
import { COLLECTIONS } from '../constant'

class UploadConnectorController {

    async uploadConnector(req: any) {
        const { name, currentChunkIndex, totalChunks, email, dbName, nameWithoutExtension, display_name, category } = req.query
        const localDirPath = path.resolve(process.env.PWD || '', `../secure-sight-scheduler/server`)
        // const localDirPath = path.resolve(process.env.PWD, `../orion-scheduler/server`)
        const firstChunk = parseInt(currentChunkIndex) === 0
        const lastChunk = parseInt(currentChunkIndex) === parseInt(totalChunks) - 1
        const data = req.body.toString().split(',')[1] || 'dummy content'
        const buffer = Buffer.from(data, 'base64')

        // save file to the name of connector base path
        const tmpFilename = crypto.createHash('md5').update(email + display_name).digest('hex') + path.extname(name)
        const filePath = `${localDirPath}/${tmpFilename}`

        if (!fs.existsSync(localDirPath)) {
            fs.mkdirSync(localDirPath, { recursive: true })
        }
        if (firstChunk && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }
        fs.appendFileSync(filePath, buffer)
        if (lastChunk) {
            if ((parseInt(totalChunks) - 1) === parseInt(currentChunkIndex)) {
                const dm = dynamicModelWithDBConnection(dbName, COLLECTIONS.CONNECTOR)
                // const query = { email, name: nameWithoutExtension, display_name, category }
                const query = { email, name: nameWithoutExtension, display_name }
                const obj = await dm.findOne(query)
                if (obj) {
                    await dm.findOneAndUpdate(query, { $set: { filePath, updated_at: new Date() } })
                }
            }
            return { msg: 'processing', tmpFilename }
        } else {
            return { msg: 'Connector upload failed' }
        }
    }
}

export default new UploadConnectorController()