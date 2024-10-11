// Define the asyncHandler function
const asyncHandler = (requestHandler) => {
  // Return a new function that wraps the requestHandler
  return (req, res, next) => {
    // Use Promise.resolve to handle both async and sync functions
    Promise.resolve(requestHandler(req, res, next))
      // If an error occurs, pass it to the next middleware
      .catch((err) => next(err));
  };
};

// Export the asyncHandler function
export { asyncHandler };

// Detailed explanation:

// 1. Function Definition:
//    const asyncHandler = (requestHandler) => { ... }
//    - This creates a higher-order function named asyncHandler.
//    - It takes a single parameter 'requestHandler', which is expected to be a function.

// 2. Returned Function:
//    return (req, res, next) => { ... }
//    - The asyncHandler returns a new function.
//    - This returned function follows the Express middleware signature (req, res, next).
//    - It acts as a wrapper around the original requestHandler.

// 3. Promise Handling:
//    Promise.resolve(requestHandler(req, res, next))
//    - Promise.resolve() is used to ensure that the result is always a promise.
//    - If requestHandler is async or returns a promise, it's used as-is.
//    - If requestHandler is synchronous, its result is wrapped in a resolved promise.

// 4. Error Catching:
//    .catch((err) => next(err))
//    - The .catch() method is used to handle any errors that occur in the promise chain.
//    - If an error occurs, it's passed to the next() function.
//    - In Express, calling next(err) signals that an error has occurred and should be handled by error-handling middleware.

// 5. Export:
//    export { asyncHandler };
//    - This makes the asyncHandler function available for use in other files.

// Overall, this utility function simplifies error handling in async Express routes.
// It allows developers to write async route handlers without try-catch blocks,
// as any errors are automatically caught and passed to Express's error handling system.
// Simple Explanation:
// This code is a helper function that makes it easier to handle asynchronous operations in Express.js routes.
// It wraps your route handlers to automatically catch any errors and pass them to Express's error handling middleware.

// Detailed Explanation:
// 1. asyncHandler is a higher-order function that takes a requestHandler function as an argument.
//    Higher-order functions are functions that can accept other functions as arguments or return them.

// 2. It returns a new function that follows Express middleware signature: (req, res, next) => {...}
//    This allows it to be seamlessly integrated into Express routes.

// 3. Inside the returned function, Promise.resolve() is used to handle both synchronous and asynchronous requestHandlers:
//    - If requestHandler returns a promise, Promise.resolve() will simply pass it through.
//    - If requestHandler is synchronous, Promise.resolve() will wrap its result in a promise.

// 4. The .catch() method is chained to handle any errors that occur during the execution of requestHandler:
//    - If an error occurs, it's passed to the next() function.
//    - In Express, calling next() with an argument is a signal that an error has occurred.

// 5. This pattern centralizes error handling, reducing boilerplate code in individual route handlers.
//    Without this, each async route would need its own try-catch block.

// 6. The use of Promise.resolve() makes this utility flexible:
//    It works with async functions, functions returning promises, and regular synchronous functions.
