"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.CONFIG = {
    PORT: process.env.PORT || 8080,
    MONGO_URL: process.env.MONGO_URL || 'MONGO-URL',
    SECRET: process.env.SECRET || 'mysecret',
    FB_CLIENT: process.env.FB_CLIENT || 'fbclient',
    FB_SECRET: process.env.FB_SECRET || 'fbsecret',
    FB_CALLBACK_URL: process.env.FB_CALLBACK_URL ||
        'http://localhost:8080/api/auth/facebook-callback',
    SUCCESS_REDIRECT: process.env.SUCCESS_REDIRECT || 'http://localhost:3000',
    FAILURE_REDIRECT: process.env.FAILURE_REDIRECT || 'http://localhost:3000/login',
};
