import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInstance } from "../models/userModel"
import { v4 as uuidv4 } from "uuid";

const NAMESPACE = 'User controller';

class UserController{
    async registration(req: Request, res: Response, next: NextFunction) {
        logging.info(NAMESPACE, `Register. `);
        const hash = await bcryptjs.hash(req.body.password, 10);
        const id = uuidv4();

        try{
            const record = await UserInstance.create({
                id: id,
                name: req.body.name,
                email: req.body.email,
                password: hash
            })
            res.json({record, message: "Successfull"})
        }catch (e){
            res.json({message: "Create fail ", status: 500, route: '/user/register', e})
        }
    }
    
    async login(req: Request, res: Response, next: NextFunction) {
        logging.info(NAMESPACE, `Login. `);
        let { email, password } = req.body;
        const existsUser: any = await UserInstance.findOne({ where: { email: email } });
        
        if (existsUser === null) {
            console.log('Not found!');
            res.status(500).json({message: "user not found"})
        } else {
            const hash = await bcryptjs.compare(password, existsUser.password)
            if(hash){
                const token = jwt.sign(
                    { user_id: existsUser.id, email },
                    "secret",
                    {
                      expiresIn: "2h",
                    }
                );
                res.status(200).json(token);
            } 
        }

        //res.status(200).json({message: existsUser})
    }
    
    async getAllUser(req: Request, res: Response) {
        logging.info(NAMESPACE, `All user. `);
        const allUser = await UserInstance.findAll({
            //optional filters
            where: {},
            raw: true,
          })
        res.status(200).json({users: allUser})
    }
    
}

export default new UserController