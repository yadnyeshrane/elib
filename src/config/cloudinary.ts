import { v2 as cloudinary } from "cloudinary";
import { config } from "./conifg";

// Configuration
cloudinary.config({
    cloud_name: config.cloudinary_cloud,
    api_key: config.cloudinary_apikey,
    api_secret: config.cloudinary_apisecret, // Click 'View API Keys' above to copy your API secret
});

export default cloudinary;
