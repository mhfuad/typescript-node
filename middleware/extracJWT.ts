import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import jwt from "jsonwebtoken";
import config from "../config/serverConfig";

const NAMESPACE = "Auth middleware";

const extracJWT = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Validating token");

    let token = req.headers.authorization?.split(' ')[1];

    if(token){
        jwt.verify(token, "secret", (error: any, decoded: any) => {
            if(error){
                return res.status(404).json({
                    message: error.message,
                    error
                })
            }else{
                res.locals.jwt = decoded
                next();
            }
        })
    }else{
        return res.status(401).json({
            message: "Unauthroized"
        })
    }
}

export default extracJWT;