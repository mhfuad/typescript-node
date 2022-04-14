"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require("body-parser");
const logging_1 = __importDefault(require("./config/logging"));
const config_1 = __importDefault(require("./config/config"));
const sample_route_1 = __importDefault(require("./routes/sample.route"));
const NAMESPACE = 'app';
const app = (0, express_1.default)();
/** Logging the request */
app.use((req, res, next) => {
    logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
    res.on('finish', () => [
        logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`)
    ]);
    next();
});
/** Parse the request */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/**Roules of our API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Autherization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', "GET PATCH DELETE POST PUT");
        return res.status(200).json({});
    }
    next();
});
/**Routes */
app.get("/", (req, res) => {
    res.send("hello");
});
app.use('/sample', sample_route_1.default);
/**error Handling */
app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});
app.listen(config_1.default.server.port, () => {
    logging_1.default.info(NAMESPACE, `server running on ${config_1.default.server.port}`);
});
