"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
var mongoose_1 = require("mongoose");
var productsCollection = 'productos';
var productsSchema = new mongoose_1.Schema({
    title: { type: String, required: true, max: 100 },
    price: {
        type: Number,
        required: true,
        min: [100, "El valor es {VALUE}, debe ser como minimo 100"],
        max: [5000, "El valor es {VALUE}, debe ser como maximo 5000"],
    },
    thumbnail: { type: String, required: true, max: 100 },
}, { versionKey: false });
exports.products = mongoose_1.model(productsCollection, productsSchema);
