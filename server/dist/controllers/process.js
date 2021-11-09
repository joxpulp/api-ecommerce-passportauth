"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processController = void 0;
var os_1 = __importDefault(require("os"));
var ProcessController = /** @class */ (function () {
    function ProcessController() {
    }
    ProcessController.prototype.info = function (req, res) {
        return res.json({
            arguments: process.argv,
            platformSO: process.platform,
            nodeVersion: process.version,
            memoryUsage: process.memoryUsage(),
            execPath: process.execPath,
            processId: process.pid,
            currentDirectory: process.cwd(),
            processorsNum: os_1.default.cpus().length,
            argumentss: process.argv,
            platformSOs: process.platform,
            nodeVersions: process.version,
            memoryUsages: process.memoryUsage(),
            execPaths: process.execPath,
            processIds: process.pid,
            currentDirectorys: process.cwd(),
            processorsNums: os_1.default.cpus().length,
        });
    };
    return ProcessController;
}());
exports.processController = new ProcessController();
