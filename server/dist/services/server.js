"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = require("../config/config");
var http = __importStar(require("http"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var express_session_1 = __importDefault(require("express-session"));
var auth_1 = __importDefault(require("../middlewares/auth"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var mongoose_1 = require("../db/mongoose");
var index_1 = __importDefault(require("../routes/index"));
mongoose_1.mongoose();
var app = express_1.default();
var server = new http.Server(app);
app.set('trust proxy', 1);
app.set('json spaces', 2);
app.use(cookie_parser_1.default());
app.use(cors_1.default({
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use(express_session_1.default({
    store: connect_mongo_1.default.create({ mongoUrl: config_1.CONFIG.MONGO_URL }),
    secret: config_1.CONFIG.SECRET,
    cookie: { sameSite: 'none', secure: 'auto', maxAge: 1000 * 120 },
    saveUninitialized: false,
    resave: true,
    rolling: true
}));
app.use(auth_1.default.initialize());
app.use(auth_1.default.session());
app.use(express_1.default.json()); // Indica que el body viene como JSON
app.use(express_1.default.urlencoded({ extended: true })); // Indica que el body puede tener un informacion como no string
app.get('/', function (req, res) {
    res.json({ msg: 'Connected to the API' });
});
app.use('/api', index_1.default);
exports.default = server;
