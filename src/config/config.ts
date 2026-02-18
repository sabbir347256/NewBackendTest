import { config as conf } from "dotenv";
conf();

const _config = {
    port : process.env.PORT,
    databaseURL : process.env.MONGO_URL,
    jwsecret : process.env.JWTTOKEN,
    cloudeName : process.env.CLOUDINARY_CLOUDE,
    cloudeApiKey : process.env.CLOUDINARY_API_KEY,
    cloudeApiSecret : process.env.CLOUDINARY_API_SECRET
}

export const config = Object.freeze(_config);