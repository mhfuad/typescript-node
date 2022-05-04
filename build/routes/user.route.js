"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const extracJWT_1 = __importDefault(require("../src/middleware/extracJWT"));
const router = express_1.default.Router();
router.get('/validate', user_controller_1.default.validationToken);
router.post('/register', user_controller_1.default.registration);
router.post('/login', user_controller_1.default.login);
router.get('/get/all', extracJWT_1.default, user_controller_1.default.getAllUser);
module.exports = router;
