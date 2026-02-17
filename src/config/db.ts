import mongoose from "mongoose";
import { config } from "./config.ts";

const connectDB = async () => {
    try {

        mongoose.connection.on('connected', () => {
            console.log('Database connected');
        })

        mongoose.connection.on('error', (err) => {
            console.log('something wrong');
        })

        

        await mongoose.connect(config.databaseURL as string);



    } catch (err) {
        console.log('failed', err);
        process.exit(1);
    }
}

export default connectDB;