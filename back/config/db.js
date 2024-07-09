import mongoose from "mongoose";
import envConfig from "./env.js";

export const connectDB = async () => {
    try{
        await mongoose.connect(envConfig.DB.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB Connection Success');
    }catch (error){
        console.log('DB Connection Error:', error);
        process.exit(1);
    }
}