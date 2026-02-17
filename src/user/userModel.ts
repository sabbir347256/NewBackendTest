import mongoose, { mongo } from "mongoose";
import type { user } from "./userTypes.ts";

const userSchema = new mongoose.Schema<user>({
    name: {
        type: String,
        require : true
    },
    email : {
        type :String,
        require : true
    },
    password : {
        type : String,
        require : true
    }
}, {timestamps : true });

export default mongoose.model<user>('User', userSchema);