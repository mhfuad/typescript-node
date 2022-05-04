import express from "express";

import controller from '../controller/user.controller';
import extracJWT from "../src/middleware/extracJWT";

const router = express.Router();

router.get('/validate', controller.validationToken)
router.post('/register', controller.registration)
router.post('/login', controller.login)
router.get('/get/all', extracJWT,  controller.getAllUser)

export = router ;