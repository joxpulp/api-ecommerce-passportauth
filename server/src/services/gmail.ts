import { CONFIG } from "../config/config";
import nodemailer from 'nodemailer';
import dayjs from "dayjs";

class Gmail {
	private owner;
	private transporter;
	constructor() {
		this.owner = {
			name: CONFIG.GMAIL_NAME,
			address: CONFIG.ETHEREAL_EMAIL,
		};

		this.transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
            secure: true,
			auth: {
				user: CONFIG.GMAIL_EMAIL,
				pass: CONFIG.GMAIL_PWD,
			},
		});
	}

	async sendEmail(dest: string, subject: string, content: string, attach: string) {
		const mailOptions = {
			from: this.owner,
			to: dest,
			subject: `${subject} | ${dayjs().format('DD-MM-YYYY')} | ${dayjs().format(
				'HH:mm:ss'
			)} `,
			html: `<h1>${content}</h1>`,
            attachments: [{
                path: attach,
                filename: 'photo.jpeg'
            }]
		};

		const response = await this.transporter.sendMail(mailOptions);
		return response;
	}
}

export const emailGmail = new Gmail();