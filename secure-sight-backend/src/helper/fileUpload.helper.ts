import multer from 'multer'
import path from 'path'
import { existsSync, mkdirSync } from 'fs'
let dir = './upload/'
if (!existsSync(dir)) {
	mkdirSync(dir, { recursive: true })
}

export const upload = multer({
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, './upload/')
		},
		filename: function (req, file, cb) {
			let filename = path.parse(file.originalname).name
			let time = new Date().getTime()
			let extension = path.extname(file.originalname)
			cb(null, filename + '-' + time + extension)
		},
	}),
})
