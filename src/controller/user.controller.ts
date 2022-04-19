import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import config from "../config/config";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const NAMESPACE = 'User controller';

const validationToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Token validated, user autherize");

    return res.status(200).json({
        message: "Authrize"
    })
}
const registration = async (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    const hash = await bcryptjs.hash(password, 10);

    res.status(200).json({message: hash})
}
const login = (req: Request, res: Response, next: NextFunction) => {
    const user = {id: 3};
    const token = jwt.sign({user}, config.server.token.secret)

    res.send({
        token: token
    })
}
const getAllUser = (req: Request, res: Response, next: NextFunction) => {
    
}

export default { validationToken, registration, login, getAllUser };