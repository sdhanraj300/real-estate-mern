import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import connectToDb from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import listingRoute from "./routes/listingRoute.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
dotenv.config();

const __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 8000;
connectToDb();

app.use(express.json());
app.use(cookieParser()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/listings", listingRoute);
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
