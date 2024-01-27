import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURL = process.env.DB_URL as string;
export const connectMongoDB = () =>
  mongoose
    .connect(mongoURL as string)
    .then(() => console.log("Successfully connected to MongoDB."));
