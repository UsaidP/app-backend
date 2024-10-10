import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    //CORS middleware function provided by the cors package
    origin: process.env.CORS_ORIGIN,
    //it's set to an environment variable CORS_ORIGIN, which allows you to configure the allowed origin(s) dynamically.
    credentials: true,
    //This enables the exchange of credentials (e.g., cookies, authorization headers) between the client and server.
  })
);
app.use(express.json({ limit: " 200kb " }));
//configures application to parse incoming requests with JSON payloads, max payload is 200kb.
app.use(express.urlencoded({ extended: true, limit: "200kb" })); //It is use for URL
//express.urlencoded() middleware function to the application.Allows nested objects in URL-encoded payloads.
//Parses incoming requests with URL-encoded payloads.
app.use(express.static("public"));
app.use(cookieParser());

// routes imports

import userRouter from "./routes/user.routes.js";

// routes declaration

app.use("/api/v1/users", userRouter);

// http://localhost:8000/api/v1/users/register

export { app };
