import { v2 } from "cloudinary";
import { config } from "./config.ts";

v2.config({
    cloud_name : config.cloudeName as string,
    api_key : config.cloudeApiKey as string,
    api_secret : config.cloudeApiSecret as string
});

export default v2;