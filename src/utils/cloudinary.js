import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Set up Cloudinary with your account details
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload a file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    // If no file path is provided, return null
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically detect file type
    });

    // Log success message
    console.log("File uploaded to Cloudinary:", response.url);

    // Return the Cloudinary response
    return response;
  } catch (error) {
    // If an error occurs, delete the local file
    fs.unlinkSync(localFilePath);
    
    // Log the error for debugging
    console.error("Error uploading to Cloudinary:", error);

    // Return null to indicate failure
    return null;
  }
};

// Make the function available for use in other files
export { uploadOnCloudinary };

// Simple Explanation:
// This code helps you send files (like pictures or videos) to Cloudinary, which is like a big online storage space.
// It sets up a connection to your Cloudinary account and provides a function to upload files.
// If the upload works, it tells you where to find the file online. If it doesn't work, it cleans up and lets you know there was a problem.

// In-depth Explanation:
// 1. We import Cloudinary and the file system (fs) module to work with files.
// 2. We configure Cloudinary using environment variables for security.
// 3. The uploadOnCloudinary function is asynchronous, meaning it can wait for the upload to finish without blocking other code.
// 4. It first checks if a file path is provided. If not, it stops immediately.
// 5. The function uses Cloudinary's upload method, setting 'resource_type' to "auto" for automatic file type detection.
// 6. If successful, it logs the URL and returns the full Cloudinary response, which includes details like file size, format, and URL.
// 7. If an error occurs, it uses fs.unlinkSync to delete the local file, preventing unnecessary storage use.
// 8. Error handling includes logging the error, which is crucial for debugging in a production environment.
// 9. The function is exported, allowing it to be imported and used in other parts of your application, promoting modular code design.
