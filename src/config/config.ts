import { config as conf } from "dotenv";
conf();

const _config = {
    port : process.env.PORT,
    databaseURL : process.env.MONGO_URL,
    jwsecret : process.env.JWTTOKEN
}

export const config = Object.freeze(_config);