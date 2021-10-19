"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./services/server"));
var socket_1 = require("./services/socket");
var config_1 = require("./config/config");
var cluster_1 = __importDefault(require("cluster"));
var os_1 = __importDefault(require("os"));
var CPUs = os_1.default.cpus().length;
(0, socket_1.ioServer)(server_1.default);
if (config_1.flags.M === 'CLUSTER' && cluster_1.default.isMaster) {
    console.log("NUMERO DE CPUS ===> " + CPUs);
    console.log("PID MASTER " + config_1.CONFIG.PROCESS_ID);
    for (var i = 0; i < CPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', function (worker) {
        console.log("Worker " + worker.process.pid + " died at " + Date());
        cluster_1.default.fork();
    });
}
else if (config_1.flags.M === 'FORK' || config_1.flags.M === 'CLUSTER') {
    server_1.default.listen(config_1.CONFIG.PORT, function () {
        return console.log("Server running in port: " + config_1.CONFIG.PORT + ", and Node process id: " + config_1.CONFIG.PROCESS_ID);
    });
    server_1.default.on('error', function (error) { return console.error("There was an error: " + error); });
}
