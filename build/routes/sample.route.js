"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const sample_controller_1 = __importDefault(require("../controller/sample.controller"));
const router = express_1.default.Router();
router.get('/ping', sample_controller_1.default.sampleHealthCheck);
module.exports = router;
