"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
var passport_1 = __importDefault(require("passport"));
var passport_facebook_1 = require("passport-facebook");
var config_1 = require("../config/config");
// Select passport strategy
var facebookStrategy = passport_facebook_1.Strategy;
// Define the strategy options, in this case we use username field and password field
var strategyOptions = {
    clientID: config_1.CONFIG.FB_CLIENT,
    clientSecret: config_1.CONFIG.FB_SECRET,
    callbackURL: config_1.CONFIG.FB_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'photos', 'emails'],
};
// Login logic
var loginFunc = function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
};
// Create the login with the local strateg, we pass the strategy options and the login logic contained in loginFunc
passport_1.default.use(new facebookStrategy(strategyOptions, loginFunc));
// Serialize the user by id
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
//  Deserialize user by looking to the db with the id and a callback that executes the done.
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
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
