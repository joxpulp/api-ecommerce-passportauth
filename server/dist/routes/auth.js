"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var config_1 = require("../config/config");
var auth_1 = require("../controllers/auth");
var facebook_auth_1 = __importDefault(require("../middlewares/facebook-auth"));
var router = (0, express_1.Router)();
router.get('/facebook-login', facebook_auth_1.default.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook-callback', facebook_auth_1.default.authenticate('facebook', {
    successRedirect: config_1.CONFIG.SUCCESS_REDIRECT,
    failureRedirect: config_1.CONFIG.FAILURE_REDIRECT,
}));
router.get('/logout', auth_1.authController.logout);
router.get('/islogged', auth_1.authController.isLogged);
exports.default = router;
