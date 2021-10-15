"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var products_1 = __importDefault(require("./products"));
var messages_1 = __importDefault(require("./messages"));
var auth_1 = __importDefault(require("./auth"));
var process_1 = require("../controllers/process");
var router = express_1.Router();
router.use('/productos', products_1.default);
router.use('/mensajes', messages_1.default);
router.use('/auth', auth_1.default);
router.get('/info', process_1.processController.info);
router.get('/randoms', process_1.processController.randoms);
exports.default = router;
