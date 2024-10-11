// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";

// const connectDB = async () => {
//   try {
//     const connectionInstance = await mongoose.connect(
//       `${process.env.MONGODB_URI}/${DB_NAME}`
//     );
//     console.log(
//       `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
//     );
//   } catch (error) {
//     console.log("MONGODB connection error", error);
//     process.exit(1);
//   }
// };
// export default connectDB;

// This file sets up the connection to our MongoDB database

// We're using mongoose, a popular library for working with MongoDB in Node.js
import mongoose from "mongoose";
// We're importing the database name from our constants file
import { DB_NAME } from "../constants.js";

// This is an asynchronous function that connects to the database
const connectDB = async () => {
  try {
    // We attempt to connect to MongoDB using the URI from our environment variables
    // and the database name we imported
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    // If the connection is successful, we log a message with the host information
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    // If there's an error connecting to the database, we log it
    console.log("MONGODB connection error", error);
    // And exit the process with a failure code (1)
    process.exit(1);
  }
};

// We export this function so it can be used in other parts of our application
export default connectDB;

// This setup allows us to easily connect to our database from anywhere in our app
// by importing and calling this function

