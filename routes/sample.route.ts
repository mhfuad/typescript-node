import express from "express";

import controller from '../controller/sample.controller';

const router = express.Router();

router.get('/ping', controller.sampleHealthCheck)

export = router;