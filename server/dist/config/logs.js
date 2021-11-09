"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var log4js_1 = __importDefault(require("log4js"));
log4js_1.default.configure({
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
exports.logger = log4js_1.default.getLogger();
