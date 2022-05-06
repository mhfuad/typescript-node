import express from "express";

import UserController from '../controller/user.controller';
import extracJWT from "../middleware/extracJWT";

const router = express.Router();

router.get('/validate', UserController.registration)
router.post('/register', UserController.registration)
router.post('/login', UserController.login)
router.get('/get/all', extracJWT,  UserController.getAllUser)

export = router ;