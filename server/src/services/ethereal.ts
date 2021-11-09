import { CONFIG } from '../config/config';
import nodemailer from 'nodemailer';
import dayjs from 'dayjs';

class Ethereal {
	private owner;
	private transporter;
	constructor() {
		this.owner = {
			name: CONFIG.ETHEREAL_NAME,
			address: CONFIG.ETHEREAL_EMAIL,
		};

		this.transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			auth: {
				user: CONFIG.ETHEREAL_EMAIL,
				pass: CONFIG.ETHEREAL_PWD,
			},
		});
	}

	async sendEmail(dest: string, subject: string, content: string) {
		const mailOptions = {
			from: this.owner,
			to: dest,
			subject: `${subject} | ${dayjs().format('DD-MM-YYYY')} | ${dayjs().format(
				'HH:mm:ss'
			)} `,
			html: `<h1>${content}</h1>`,
		};

		const response = await this.transporter.sendMail(mailOptions);
		return response;
	}
}

export const emailEthereal = new Ethereal();
