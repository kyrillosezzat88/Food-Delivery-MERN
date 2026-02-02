import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

// importing Routes
import { authRouter } from "./routes/auth.js";
import productRouter from "./routes/product.js";
import categoryRouter from "./routes/category.js";
import orderRouter from "./routes/order.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
dotenv.config();
app.use(morgan("tiny"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

// All App Routes
const BaseURL = "/api/v1";
const Port = process.env.PORT || 5000;
const MongoDBUrl = process.env.MONGODB_URL || "";

// Auth Routes
app.use(`${BaseURL}/auth`, authRouter);
app.use(`${BaseURL}/products`, productRouter);
app.use(`${BaseURL}/categories`, categoryRouter);
app.use(`${BaseURL}/orders`, orderRouter);

// connect to the mongodb
mongoose
  .connect(MongoDBUrl)
  .then(() => {
    app.listen(Port, () => {
      console.log(`Server is running on port ${Port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
