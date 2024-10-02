import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: " 20kb " }));
app.use(express.urlencoded({ extended: true, limit: "20kb" })); //It is use for URL
app.use(express.static);
app.use(cookieParser());
