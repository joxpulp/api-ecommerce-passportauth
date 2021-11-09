import { CONFIG } from '../config/config';
import twilio from 'twilio';

class Twilio {
	private twilio;

	constructor() {
		this.twilio = twilio(CONFIG.TWILIO_ACCOUNTID, CONFIG.TWILIO_AUTHTOKEN);
	}

	async sendMessage(from: string,message: string) {
		const params = {
			body: `De: ${from} | Mensaje: ${message}`,
			from: CONFIG.TWILIO_PHONE,
			to: '+593963773024',
		};

		const response = await this.twilio.messages.create(params);
		return response;
	}
}

export const smsTwilio = new Twilio();
