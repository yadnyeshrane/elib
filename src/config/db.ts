import mongoose from "mongoose";
import { config } from "./conifg";

const connectDb = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Db connected");
        });
        mongoose.connection.on("error", (err) => {
            console.log("error in connection db", err);
        });
        await mongoose.connect(config.dburl as string);
    } catch (error) {
        console.log("Error in db", error);
        //stop the application
        process.exit(1);
    }
};

export default connectDb;
