import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        });
        let mongoUri = process.env.MONGO_URI;
        const projectName = "resume-builder";

        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }

        if(mongoUri.endsWith('/')){
            mongoUri = mongoUri.slice(0, -1);
        }

        await mongoose.connect(`${mongoUri}/${projectName}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;