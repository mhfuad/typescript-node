import jwt from "jsonwebtoken";
import config from "../../config/config";
import logging from "../../config/logging";
import IUser from "../interface/user.interface";

const NAMESPACE = "Auth function";

const singJWT = (user: IUser, callbck: (error: Error | null, token: string | null) => void): void =>{
    var timeSinchEpoch = new Date().getTime();
    var expirationTime = timeSinchEpoch + Number(config.server.token.erpireTime) * 100000;
    var expirationTimeSecond = Math.floor(expirationTime / 100);

    logging.info(NAMESPACE, `Attempting to sign token for ${user.username}`)

    try{
        jwt.sign(
                {username: user.username},
                config.server.token.secret,
                {
                    issuer: config.server.token.issuer,
                    algorithm: 'HS256',
                    expiresIn: expirationTimeSecond
                },
                (error, token) => {
                    if(error){
                        callbck(error, null);
                    }
                    else if (token){
                        callbck(null, token)
                    }
                    
                }
                
            )
    } catch(error: any){
        logging.error(NAMESPACE, error.message.toString(), error)
        callbck(error, null)
    }
}

export default singJWT;