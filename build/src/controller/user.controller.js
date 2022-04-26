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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../../config/logging"));
const config_1 = __importDefault(require("../../config/config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const NAMESPACE = 'User controller';
const validationToken = (req, res, next) => {
    logging_1.default.info(NAMESPACE, "Token validated, user autherize");
    return res.status(200).json({
        message: "Authrize"
    });
};
const registration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = req.body;
    const hash = yield bcryptjs_1.default.hash(password, 10);
    res.status(200).json({ message: hash });
});
const login = (req, res, next) => {
    const user = { id: 3 };
    const token = jsonwebtoken_1.default.sign({ user }, config_1.default.server.token.secret);
    res.send({
        token: token
    });
};
const getAllUser = (req, res, next) => {
};
exports.default = { validationToken, registration, login, getAllUser };
