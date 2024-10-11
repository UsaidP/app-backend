// This is a special container for sending back information from our server

class ApiResponse {
  // When we create a new ApiResponse, we give it some details
  constructor(statusCode, data, message = "Success") {
    // The status code tells us if everything went okay (like 200) or if there was a problem (like 404)
    this.statusCode = statusCode;
    
    // This is the main information we want to send back
    this.data = data;
    
    // A short message explaining what happened (it says "Success" by default)
    this.message = message;
    
    // This is a quick way to check if everything went well
    // If the status code is less than 400, it means success
    this.success = statusCode < 400;
  }
}

// We're making ApiResponse available for other parts of our code to use
export { ApiResponse };

// This ApiResponse helps us organize how we send information back to users
// It includes whether things worked out, what data to send, and a message to explain

// Detailed Explanation:
// The ApiResponse class is a structured way to format responses from our API (Application Programming Interface).
// It encapsulates four key pieces of information:
// 1. statusCode: An HTTP status code that indicates the outcome of the request. Codes below 400 typically indicate success, while 400 and above indicate various types of errors.
// 2. data: The main payload of the response. This could be any type of data that the API needs to send back to the client.
// 3. message: A human-readable string that provides additional context about the response. It defaults to "Success" if not specified.
// 4. success: A boolean flag that's automatically set based on the statusCode. It's true for codes below 400, false otherwise.

// The constructor of this class takes these pieces of information (with message having a default value) and sets them as properties of the instance.
// This standardized format helps in consistent error handling and response parsing on the client side.
// By exporting this class, we allow other parts of our application to create instances of ApiResponse, ensuring a uniform structure for all API responses throughout our system.
