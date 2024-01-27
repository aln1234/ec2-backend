import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

// middlewares
import { loggingMiddleware } from "./middlewares/logging";
import { errorLoggingMiddleware } from "./middlewares/error";
import { routeNotFound } from "./middlewares/routeNotFound";

// routes
import productsRoute from "./routes/productsRoute";
import categoriesRoute from "./routes/categoriesRoute";
import usersRoute from "./routes/usersRoute";
import sizesRoute from "./routes/sizesRoute";
import cartRoute from "./routes/cartRoute";
import orderRoute from "./routes/orderRoute";
import authRoute from "./routes/authRoute";
import { connectMongoDB } from "./config/mongoose";
import cors from "cors";
import stripeRoute from "./routes/stripeRoute";

// app config
const app = express();

// DB connect
connectMongoDB();

// middleware connections
app.use(express.json());
app.use(loggingMiddleware);
app.use(cors());

// define routes
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/categories", categoriesRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/sizes", sizesRoute);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/stripe", stripeRoute);
app.use("/api/v1/orders", orderRoute);

app.use(errorLoggingMiddleware);
// catch-all route for non-existing routes
app.use("*", routeNotFound);

// run server

export default app;
