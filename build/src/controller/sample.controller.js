"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../../config/logging"));
const NAMESPACE = 'Sample controller';
const sampleHealthCheck = (req, res) => {
    logging_1.default.info(NAMESPACE, `Sample health check route called. `);
    return res.json({
        message: 'pong'
    });
};
exports.default = { sampleHealthCheck };
