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
// Makes files in the "public" directory accessible via HTTP requests.
// Serves files directly without routing or processing.
// Allows clients to cache files for improved performance.




app.use(cookieParser());
// app.use(cookieParser()) adds the cookie-parsing middleware to the Express application.
// This middleware parses Cookie header and populates req.cookies with an object keyed by the cookie names.
// It allows easy access to cookies in request handlers.
// For example, if a cookie named 'sessionId' is sent by the client, it can be accessed as req.cookies.sessionId.
// This is useful for handling user sessions, remembering user preferences, or any other client-side storage needs.
// The middleware also supports signed cookies when a secret is provided, enhancing security.

// routes imports

import userRouter from "./routes/user.routes.js";

// routes declaration

app.use("/api/v1/users", userRouter);
// Explanation of app.use("/api/v1/users", userRouter):

// This line mounts the userRouter middleware on the "/api/v1/users" path.
// It means that any requests to URLs starting with "/api/v1/users" will be handled by the userRouter.

// Breaking it down:
// - "/api/v1/users" is the base path for all user-related routes
// - "api" indicates it's an API endpoint
// - "v1" represents the version of the API (version 1)
// - "users" specifies that these routes are related to user operations

// userRouter is likely an Express router object defined in "./routes/user.routes.js"
// It contains route handlers for various user-related operations like registration, login, profile updates, etc.

// For example, if userRouter has a route defined as router.post("/register", registerUser),
// it will be accessible at http://localhost:8000/api/v1/users/register

// This modular approach helps in organizing routes and keeping the main app.js file clean.

// http://localhost:8000/api/v1/users/register

export { app };
