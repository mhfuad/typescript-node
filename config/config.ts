import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const SERVER_TOKEN_ERPIRETIME = process.env.SERVER_PORT || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_PORT || "codeissuer";
const SERVER_TOKEN_SECRET = process.env.SERVER_PORT || "superencrypedsecret";

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        erpireTime: SERVER_TOKEN_ERPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};

const config = {
    server: SERVER
}

export default config;