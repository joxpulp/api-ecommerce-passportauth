import log4js from 'log4js';

log4js.configure({
	appenders: {
		console: { type: 'console' },
		warnFile: {
			type: 'file',
			filename: './logs/warn.log',
			compress: true,
		},
		errorFile: {
			type: 'file',
			filename: './logs/error.log',
			compress: true,
		},
		warnlog: {
			type: 'logLevelFilter',
			appender: 'warnFile',
			level: 'warn',
		},
		errorlog: {
			type: 'logLevelFilter',
			appender: 'errorFile',
			level: 'error',
		},
	},
	categories: {
		default: { appenders: ['console', 'warnlog', 'errorlog'], level: 'all' },
	},
});

export const logger = log4js.getLogger();
