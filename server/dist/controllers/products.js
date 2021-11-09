"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
var faker_1 = __importDefault(require("faker"));
var productschema_1 = require("../models/productschema");
var logs_1 = require("../config/logs");
var ProductController = /** @class */ (function () {
    function ProductController() {
    }
    ProductController.prototype.getProducts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, singleProduct, get, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        id = req.params.id;
                        if (!id) return [3 /*break*/, 2];
                        return [4 /*yield*/, productschema_1.products.findById(id)];
                    case 1:
                        singleProduct = _a.sent();
                        if (singleProduct === null) {
                            return [2 /*return*/, res
                                    .status(404)
                                    .json({ error: 'Product with this id does not exist' })];
                        }
                        return [2 /*return*/, res.json({ product: singleProduct })];
                    case 2: return [4 /*yield*/, productschema_1.products.find()];
                    case 3:
                        get = _a.sent();
                        if (get.length === 0) {
                            return [2 /*return*/, res.status(404).json({ error: 'There are no products' })];
                        }
                        return [2 /*return*/, res.json({ products: get })];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        if (error_1 instanceof Error) {
                            logs_1.logger.error(error_1.message);
                            logs_1.logger.fatal(error_1.message);
                            res.status(500).json({ error: error_1.message });
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.getProductsTest = function (req, res) {
        var cant = req.query.cant;
        var response = [];
        var fakerProducts = {
            title: faker_1.default.commerce.productName(),
            price: Number(faker_1.default.commerce.price()),
            thumbnail: faker_1.default.image.technics(),
        };
        if (cant) {
            if (Number(cant) !== 0) {
                for (var i = 0; i < Number(cant); i++) {
                    response.push(fakerProducts);
                }
                return res.json({ products: response });
            }
            return res.status(404).json({ message: 'There are no products' });
        }
        for (var i = 0; i < 10; i++) {
            response.push(fakerProducts);
        }
        return res.json({ productos: response });
    };
    ProductController.prototype.addProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, price, thumbnail, product, newProduct, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, title = _a.title, price = _a.price, thumbnail = _a.thumbnail;
                        if (!title || !price || !thumbnail) {
                            logs_1.logger.warn('Falto algo en body');
                            return [2 /*return*/, res.status(400).json({ error: 'Missing body fields' })];
                        }
                        product = new productschema_1.products({ title: title, price: price, thumbnail: thumbnail });
                        return [4 /*yield*/, product.save()];
                    case 1:
                        newProduct = _b.sent();
                        logs_1.logger.info('Producto CREADO');
                        return [2 /*return*/, res.json({ newProduct: newProduct })];
                    case 2:
                        error_2 = _b.sent();
                        if (error_2 instanceof Error) {
                            logs_1.logger.error(error_2.message);
                            logs_1.logger.fatal(error_2.message);
                            res.status(500).json({ error: error_2.message });
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.updateProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, title, price, thumbnail, item, updatedProduct, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        id = req.params.id;
                        _a = req.body, title = _a.title, price = _a.price, thumbnail = _a.thumbnail;
                        if (!title || !price || !thumbnail)
                            return [2 /*return*/, res.status(400).json({ error: 'Missing body fields' })];
                        return [4 /*yield*/, productschema_1.products.findByIdAndUpdate(id, { $set: req.body }, { runValidators: true })];
                    case 1:
                        item = _b.sent();
                        if (!(item === null)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(404).json({
                                error: 'Product with this id does not exist',
                            })];
                    case 2: return [4 /*yield*/, productschema_1.products.findById(id)];
                    case 3:
                        updatedProduct = _b.sent();
                        return [2 /*return*/, res.json({ updatedProduct: updatedProduct })];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_3 = _b.sent();
                        if (error_3 instanceof Error) {
                            logs_1.logger.error(error_3.message);
                            logs_1.logger.fatal(error_3.message);
                            res.status(500).json({ error: error_3.message });
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.deleteProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, product, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, productschema_1.products.findByIdAndDelete(id)];
                    case 2:
                        product = _a.sent();
                        if (product === null) {
                            return [2 /*return*/, res.status(404).json({
                                    error: 'Product with this id does not exist',
                                })];
                        }
                        else {
                            return [2 /*return*/, res.json({ productoBorrado: product })];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        if (error_4 instanceof Error) {
                            logs_1.logger.error(error_4.message);
                            logs_1.logger.fatal(error_4.message);
                            logs_1.logger.debug('Si hay un error en delete, debe salir este mensaje');
                            res.status(500).json({ error: error_4.message });
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ProductController;
}());
exports.productController = new ProductController();
