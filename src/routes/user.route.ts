import express from "express";

import controller from '../controller/user.controller';
import extracJWT from "../middleware/extracJWT";

const router = express.Router();

router.get('/validate', controller.validationToken)
router.get('/register', controller.registration)
router.get('/login', controller.login)
router.get('/get/all', extracJWT,  controller.getAllUser)

export = router ;