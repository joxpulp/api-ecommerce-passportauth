import dotenv from 'dotenv';
import args from 'args';

dotenv.config();

args
	.option('port', 'Sets the port with CLI')
	.option('FB_CLIENT_ID', 'SETS FB client id')
	.option('FB_CLIENT_SECRET', 'SETS FB client SECRET')
	.option('MODE', 'Sets fork mode', 'FORK')
	.option('CLUSTER', 'Sets cluster mode', false)

export const flags = args.parse(process.argv)


export const CONFIG = {
	PORT: flags.port || process.env.PORT || 8080,
	MONGO_URL: process.env.MONGO_URL || 'MONGO-URL ',
	SECRET: process.env.SECRET || 'mysecret',
	FB_CLIENT: flags.FB_CLIENT_ID || process.env.FB_CLIENT,
	FB_SECRET: flags.FB_CLIENT_SECRET || process.env.FB_SECRET,
	FB_CALLBACK_URL:
		process.env.FB_CALLBACK_URL ||
		'http://localhost:8080/api/auth/facebook-callback',
	SUCCESS_REDIRECT: process.env.SUCCESS_REDIRECT || 'http://localhost:3000/#',
	FAILURE_REDIRECT:
		process.env.FAILURE_REDIRECT || 'http://localhost:3000/#/login',
	PROCESS_ID: process.pid,
	ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL || 'email',
	ETHEREAL_PWD: process.env.ETHEREAL_PWD || 'password',
	ETHEREAL_NAME: process.env.ETHEREAL_NAME || 'name',
	GMAIL_EMAIL: process.env.GMAIL_EMAIL || 'email',
	GMAIL_PWD: process.env.GMAIL_PWD || 'password',
	GMAIL_NAME: process.env.GMAIL_NAME || 'name',
	TWILIO_ACCOUNTID: process.env.TWILIO_ACCOUNTID || 'sid',
	TWILIO_AUTHTOKEN: process.env.TWILIO_AUTHTOKEN || 'secret',
	TWILIO_PHONE: process.env.TWILIO_PHONE || 'phone',
};
