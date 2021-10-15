"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./services/server"));
var socket_1 = require("./services/socket");
var config_1 = require("./config/config");
socket_1.ioServer(server_1.default);
server_1.default.listen(config_1.CONFIG.PORT, function () { return console.log("Server running in port: " + config_1.CONFIG.PORT + ", and Node process id: " + config_1.CONFIG.PROCESS_ID); });
server_1.default.on('error', function (error) { return console.error("There was an error: " + error); });
