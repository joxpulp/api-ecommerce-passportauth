"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var args_1 = __importDefault(require("args"));
dotenv_1.default.config();
args_1.default
    .option('port', 'Sets the port with CLI')
    .option('FB_CLIENT_ID', 'SETS FB client id')
    .option('FB_CLIENT_SECRET', 'SETS FB client SECRET');
var flags = args_1.default.parse(process.argv);
exports.CONFIG = {
    PORT: flags.port || 3001,
    MONGO_URL: process.env.MONGO_URL || 'MONGO-URL',
    SECRET: process.env.SECRET || 'mysecret',
    FB_CLIENT: flags.FB_CLIENT_ID || '293339155659928',
    FB_SECRET: flags.FB_CLIENT_SECRET || 'b1f8348753fa46dc94734555c137af9f',
    FB_CALLBACK_URL: process.env.FB_CALLBACK_URL ||
        'http://localhost:8080/api/auth/facebook-callback',
    SUCCESS_REDIRECT: process.env.SUCCESS_REDIRECT || 'http://localhost:3000',
    FAILURE_REDIRECT: process.env.FAILURE_REDIRECT || 'http://localhost:3000/login',
    PROCESS_ID: process.pid
};
