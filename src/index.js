// require('dotenv').config({path: './env'})
// import  mongoose from ("mongoose");
// import { DB_NAME } from "./constants";

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed !!! ", err);
  });

/*
import express from "express"

const app = express()

(async () => {
  try {
    mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error", (error)=>{
        console.log("ERROR: ", error)
        throw error
    })
    app.listen(process.env.PORT,()=>{
        console.log(`app is listening of ${process.env.PORT}`)
    })
  } catch (error) {
    console.log("ERROR:", error);
    throw error;
  }
})();
*/
