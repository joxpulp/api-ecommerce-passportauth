"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNumbers = void 0;
var randomNumbers = function (cant) {
    var randomArray = Array.from({ length: cant }, function () {
        return Math.floor(Math.random() * (1001 - 1) + 1);
    });
    var countRepeated = randomArray.reduce(function (acc, value) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[value] = (acc[value] || 0) + 1, _a)));
    }, {});
    return countRepeated;
};
exports.randomNumbers = randomNumbers;
