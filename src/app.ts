import express, { Application, Request, Response, NextFunction} from 'express';
import bodyParser = require('body-parser'); 
import logging from '../config/logging';
import config from '../config/config';

import sampleRoutes from "./routes/sample.route"
import userRoutes from "./routes/user.route"

const NAMESPACE = 'app';

const app: Application = express();

/** Logging the request */
app.use( (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => [
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`)
    ])

    next();
})
/** Parse the request */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

/**Roules of our API */
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Autherization');

    if( req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', "GET PATCH DELETE POST PUT");
        return res.status(200).json({});
    }
    next();
});

/**Routes */
app.get("/", (req: Request, res: Response) => {
    res.send("hello");
});
app.use('/sample', sampleRoutes);
app.use('/user', userRoutes);

/**error Handling */
app.use((req: Request, res: Response, next: NextFunction):object => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    })
})

app.listen(config.server.port, ()=> {
    logging.info(NAMESPACE, `server running on ${config.server.port}`)
})