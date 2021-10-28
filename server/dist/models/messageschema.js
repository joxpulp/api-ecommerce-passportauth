"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = void 0;
var mongoose_1 = require("mongoose");
var messagesCollection = 'mensajes';
var messagesSchema = new mongoose_1.Schema({
    email: { type: String, required: true, max: 100 },
    message: { type: String, required: true, max: 100 },
    date: { type: String, required: true, max: 100 },
    time: { type: String, required: true, max: 100 },
}, { versionKey: false });
exports.messages = mongoose_1.model(messagesCollection, messagesSchema);
