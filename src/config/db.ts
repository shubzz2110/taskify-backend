import mongoose from "mongoose";
import config from "./config";

const mongoUri = config.mongoUri;

const connectToDatabase = () => {
  mongoose
    .connect(mongoUri)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log("Error connecting to mongoDB: ", err));
};

export default connectToDatabase;
