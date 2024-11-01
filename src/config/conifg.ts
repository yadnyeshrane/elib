import { config as conf } from "dotenv";
conf();
const _config = {
    port: process.env.PORT,
    dburl: process.env.MONGO_CONNECTION_STRING,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    cloudinary_cloud: process.env.CLOUDINARY_CLOUD,
    cloudinary_apikey: process.env.CLOUDINARY_APIKEY,
    cloudinary_apisecret: process.env.CLOUDINARY_APISECRET,
};

export const config = Object.freeze(_config);
