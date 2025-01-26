import nodemailer from 'nodemailer'
import path from 'path'
import { config } from 'dotenv'

config()

export const transporter = nodemailer.createTransport({
	service: process.env.EMAIL_SERVICE,
	//secure:false,
	auth: {
		user: process.env.EMAIL_USERNAME,
		pass: process.env.EMAIL_PASSWORD,
	},
})

export interface emailPayload {
	from?: string
	to: string | Array<string>
	subject: string
	text?: string
	html?: string
	attachments?: Array<{
		filename?: string
		content?: string
		contentType?: string
		path?: string
	}>
}

export const sendEmail = async (payload: emailPayload) => {
	const { from, to, subject, text, html, attachments } = payload

	let message: emailPayload = {
		from: `Trend-Micro-Unity<${process.env.EMAIL_USERNAME}>`,
		to,
		subject,
		text,
		html,
		attachments,
	}

	await transporter.sendMail(message)
}
