import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// This file defines the User model for our MongoDB database using Mongoose

// Create a new schema for users
const userSchema = new Schema(
  {
    // Username field: required, unique, lowercase, trimmed, and indexed for faster queries
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    // Email field: required, unique, lowercase, and trimmed
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // Full name field: required, trimmed, and indexed
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    // Avatar field: stores a URL to the user's profile picture (required)
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    // Cover image field: optional, stores a URL to the user's cover image
    coverImage: {
      type: String,
    },
    // Watch history: an array of Video IDs that the user has watched
    watchHistory: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    // Password field: required
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    // Refresh token field: used for authentication
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Middleware: Before saving a user, hash the password if it has been modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
  console.log(this.password);
});

// Method to check if a given password matches the user's hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate an access token for the user
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Method to generate a refresh token for the user
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.fullName,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// Create and export the User model based on the schema
export const User = mongoose.model("User", userSchema);

// Here's a detailed explanation of the code in simple terms:
// 1. jwt.sign() function:
//    - This function is used to create a new JWT (JSON Web Token), which is a secure way to transmit information.
//    - It takes three main parameters:
//      a. The payload: This is the data you want to include in the token. Here, it includes the user's ID, email, and username.
//      b. The secret key: This is a secret code that helps protect the token. It's stored in an environment variable for security.
//      c. Options: These are additional settings for the token. For example, 'expiresIn' sets how long the token is valid.

// 2. Environment Variables:
//    - process.env.REFRESH_TOKEN_SECRET: This is the secret key used to sign the token. It's stored in the environment for security.
//    - process.env.REFRESH_TOKEN_EXPIRY: This sets how long the token is valid. After this time, the token can't be used.

// 3. The purpose of this method:
//    - This method is used to generate a refresh token. Refresh tokens are used to obtain a new access token, usually after the old one expires.
//    - This is useful in applications where users need to stay logged in for long periods without re-entering their password.

// 4. Return value:
//    - The jwt.sign() function returns the token, but here it's not being stored or returned. To make it useful, we should return the token.

// Let's correct the code to return the token:

//   Let me explain this password hashing middleware in detail.

// Let's break down this middleware function line by line:

// ```javascript
// userSchema.pre("save", async function (next) {
// ```
// 1. `userSchema.pre()`: This is a Mongoose middleware hook that runs BEFORE ("pre") a specific operation
// 2. `"save"`: This specifies that this middleware runs before any save operation on a User document
// 3. `async function`: We use an async function because password hashing is an asynchronous operation
// 4. `next`: This is the middleware callback function that passes control to the next middleware

// ```javascript
// if (!this.isModified("password")) return next();
// ```
// This line is crucial for performance and proper functioning:
// - `this.isModified("password")` checks if the password field has been changed
// - If password is NOT modified (`!this.isModified("password")`):
//   - Returns early and calls `next()`
//   - Prevents unnecessary password hashing
//   - Important for scenarios like updating user email or other fields
//   - Saves computational resources

// ```javascript
// this.password = await bcrypt.hash(this.password, 10);
// ```
// If the password IS modified, this line handles the hashing:
// - `bcrypt.hash()`: The actual hashing function
// - `this.password`: The plain text password to be hashed
// - `10`: The salt rounds (work factor)
//   - Higher number = more secure but slower
//   - 10 is a good balance between security and performance
//   - Each increment doubles the computational time
// - `await`: Waits for the hashing to complete before proceeding

// ```javascript
// next();
// ```
// - Calls the next middleware in the stack
// - Allows the save operation to continue
// - Essential for proper middleware chain execution

// Example usage scenarios:

// 1. **Creating new user:**
// ```javascript
// const user = new User({
//   username: "john_doe",
//   password: "plaintext123"  // Will be hashed
// });
// await user.save();  // Middleware triggers here
// ```

// 2. **Updating password:**
// ```javascript
// user.password = "newpassword123";  // Will be hashed
// await user.save();  // Middleware triggers here
// ```

// 3. **Updating other fields:**
// ```javascript
// user.email = "new@email.com";  // Password unchanged
// await user.save();  // Middleware skips hashing
// ```

// The complete flow:
// ```mermaid
// graph TD
//     A[Save Operation Triggered] --> B{Is Password Modified?}
//     B -->|No| C[Skip Hashing]
//     B -->|Yes| D[Hash Password]
//     D --> E[Replace Plain Password with Hash]
//     C --> F[Continue Save Operation]
//     E --> F
// ```

// Security considerations:
// 1. Always runs before saving, ensuring no plain text passwords are stored
// 2. Uses async/await for proper handling of the hashing operation
// 3. Only hashes when necessary, preventing double-hashing
// 4. Salt is automatically generated and stored with the hash
// 5. Uses industry-standard bcrypt algorithm

// This middleware is a crucial security component that:
// - Automatically handles password hashing
// - Prevents plain text password storage
// - Optimizes performance by only hashing when needed
// - Ensures consistent password security across your application

// Would you like me to explain more about bcrypt specifically or how this interacts with other parts of the user schema?

// Let me explain this password checking function in simple terms.

// ```javascript
// userSchema.methods.isPasswordCorrect = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };
// ```

// Let's break this down like we're explaining it to a friend:

// 1. **What this function does:**
//    - It's like a password checker - imagine it as a security guard that checks if the password you're trying to use matches the one you created when you first signed up

// 2. **How to use it:**
// ```javascript
// Example usage
// const user = await User.findOne({ email: "user@example.com" });
// const isCorrect = await user.isPasswordCorrect("mypassword123");

// if (isCorrect) {
//     console.log("Password is correct! ✅");
// } else {
//     console.log("Wrong password! ❌");
// }
// ```

// 3. **How it works step by step:**

//    a. When you try to log in:
//    ```javascript
// What you provide
//    password = "mypassword123"  // The password you type when logging in

// What's in the database
//    this.password = "$2b$10$XXXXX..."  // The stored hashed password
//    ```

//    b. The function:
//    - Takes the password you're trying to use
//    - Compares it with the encrypted (hashed) password stored in the database
//    - Returns true if they match, false if they don't

// 4. **Real-world analogy:**
//    - Think of it like a locker with a special lock
//    - The stored hashed password is like the lock's internal mechanism
//    - The password you enter is like the key
//    - bcrypt.compare is like trying the key in the lock
//    - It will only open (return true) if it's the right key

// 5. **Important points:**
//    - `async`: It takes a tiny bit of time to check the password
//    - `bcrypt.compare`: Does the actual secure comparison
//    - We never store the actual password, only its hashed version
//    - It's impossible to reverse the hash to get the original password

// 6. **Example scenarios:**

// ```javascript
// Correct password scenario
// const user = {
//     password: "$2b$10$XXXXX..." // Hashed version of "correct123"
// };

// await user.isPasswordCorrect("correct123")  // Returns: true
// await user.isPasswordCorrect("wrong123")    // Returns: false
// ```

// Visual representation of the process:
// ```mermaid
// graph TD
//     A[User enters password] --> B[Function receives password]
//     B --> C{bcrypt.compare}
//     C --> D[Checks against stored hash]
//     D --> E{Do they match?}
//     E -->|Yes| F[Return true]
//     E -->|No| G[Return false]
// ```

// This function is important because:
// 1. It keeps passwords secure
// 2. You can't accidentally expose the real password
// 3. It's a standard way to verify passwords safely
// 4. It protects against various types of attacks

// Would you like me to explain more about:
// - How to use this in a login system?
// - Why we use bcrypt specifically?
// - How this connects with other security features?
