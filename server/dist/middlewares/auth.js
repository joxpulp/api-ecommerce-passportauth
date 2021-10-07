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
exports.isAuth = void 0;
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = __importDefault(require("passport-local"));
var userschema_1 = require("../models/userschema");
// Select passport strategy
var localStrategy = passport_local_1.default.Strategy;
// Define the strategy options, in this case we use username field and password field
var strategyOptions = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
};
// Login logic
var loginFunc = function (req, username, password, done) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, userschema_1.userModel.findOne({ username: username })];
            case 1:
                user = _b.sent();
                _a = !user;
                if (_a) return [3 /*break*/, 3];
                return [4 /*yield*/, user.isValidPassword(password)];
            case 2:
                _a = !(_b.sent());
                _b.label = 3;
            case 3:
                if (_a) {
                    return [2 /*return*/, done(null, false, {
                            error: 'Invalid username or password, try again',
                        })];
                }
                return [2 /*return*/, done(null, user)];
        }
    });
}); };
//  Signup logic
var signupFunc = function (req, username, password, done) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username_1, password_1, email, name_1, lastname, user, userData, newUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, username_1 = _a.username, password_1 = _a.password, email = _a.email, name_1 = _a.name, lastname = _a.lastname;
                if (!username_1 || !password_1 || !email || !name_1 || !lastname) {
                    return [2 /*return*/, done(null, false, { error: 'Missing fields in body' })];
                }
                return [4 /*yield*/, userschema_1.userModel.findOne({
                        $or: [{ username: username_1 }, { email: email }],
                    })];
            case 1:
                user = _b.sent();
                if (!user) return [3 /*break*/, 2];
                return [2 /*return*/, done(null, false, { error: 'User already exist, try with other option' })];
            case 2:
                userData = {
                    username: username_1,
                    password: password_1,
                    email: email,
                    name: name_1,
                    lastname: lastname,
                };
                newUser = new userschema_1.userModel(userData);
                return [4 /*yield*/, newUser.save()];
            case 3:
                _b.sent();
                return [2 /*return*/, done(null, newUser)];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                done(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
// Create the login with the local strateg, we pass the strategy options and the login logic contained in loginFunc
passport_1.default.use('login', new localStrategy(strategyOptions, loginFunc));
// Create the signup with the local strategy, we pass the strategy options and the signup logic contained in signupFunc
passport_1.default.use('signup', new localStrategy(strategyOptions, signupFunc));
// Serialize the user by id
passport_1.default.serializeUser(function (user, done) {
    done(null, user._id);
});
//  Deserialize user by looking to the db with the id and a callback that executes the done.
passport_1.default.deserializeUser(function (userId, done) {
    userschema_1.userModel.findById(userId, function (err, user) {
        done(err, user);
    });
});
var isAuth = function (req, res, done) {
    if (req.isAuthenticated()) {
        done();
    }
    else {
        return res.status(401).json({
            error: 'You are not authenticated',
        });
    }
};
exports.isAuth = isAuth;
exports.default = passport_1.default;
