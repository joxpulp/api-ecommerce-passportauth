"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.isLogged = function (req, res) {
        if (req.user) {
            return res.json({ logged: true, user: req.user });
        }
        else {
            return res.status(404).json({ logged: false });
        }
    };
    AuthController.prototype.logout = function (req, res) {
        if (req.user) {
            req.logout();
            return res.json({ msg: 'Session ended', logged: false });
        }
        return res
            .status(404)
            .json({ error: 'The is no session started or is already logout' });
    };
    return AuthController;
}());
exports.authController = new AuthController();
