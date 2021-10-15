"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processController = void 0;
var path_1 = __importDefault(require("path"));
var child_process_1 = require("child_process");
var scriptPath = path_1.default.resolve(__dirname, '../utils/randoms.js');
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
        });
    };
    ProcessController.prototype.randoms = function (req, res) {
        var cant = req.query.cant;
        var computo = child_process_1.fork(scriptPath);
        computo.send(Number(cant) || 100000000);
        computo.on('message', function (result) {
            res.json(result);
        });
    };
    return ProcessController;
}());
exports.processController = new ProcessController();
