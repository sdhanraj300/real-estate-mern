import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToDb from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
connectToDb();

app.use(express.json());
app.use(cookieParser()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
