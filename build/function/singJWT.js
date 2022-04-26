"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = "Auth function";
const singJWT = (user, callbck) => {
    var timeSinchEpoch = new Date().getTime();
    var expirationTime = timeSinchEpoch + Number(config_1.default.server.token.erpireTime) * 100000;
    var expirationTimeSecond = Math.floor(expirationTime / 100);
    logging_1.default.info(NAMESPACE, `Attempting to sign token for ${user.username}`);
    try {
        jsonwebtoken_1.default.sign({ username: user.username }, config_1.default.server.token.secret, {
            issuer: config_1.default.server.token.issuer,
            algorithm: 'HS256',
            expiresIn: expirationTimeSecond
        }, (error, token) => {
            if (error) {
                callbck(error, null);
            }
            else if (token) {
                callbck(null, token);
            }
        });
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, error.message.toString(), error);
        callbck(error, null);
    }
};
exports.default = singJWT;
