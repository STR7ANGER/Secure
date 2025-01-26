import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const mailSchema = new Schema({
	to: String,
	subject: String,
	text: String,

	// attachments?: Array<{
	//  filename?: string
	//  content?: string
	//  contentType?: string
	//  path?: string
	// }>
})

const schedulingSchema = new Schema({
	minutes: Number,
	hours: Number,
	days: Number,
	months: Number,
	dayOfWeek: Number,
	isSpecificDateAndTime: Boolean,
})

const schedulerSchema = new Schema({
	userId: ObjectId,
	reportIds: [ObjectId],
	isScheduleActive: Boolean,
	mailData: mailSchema,
	schedule: schedulingSchema,
})

export = mongoose.model('Scheduler', schedulerSchema)
