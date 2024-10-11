// This file defines a custom error class called ApiError

// ApiError extends the built-in Error class
class ApiError extends Error {
  // The constructor takes four parameters:
  // - statusCode: HTTP status code for the error
  // - message: Error message (default is "Something went wrong")
  // - errors: Array of additional error details (default is empty array)
  // - stack: Error stack trace (optional)
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    // Call the parent Error constructor with the message
    super(message);

    // Set custom properties
    this.statusCode = statusCode;
    this.data = null;
    this.errors = errors;

    // If a stack trace is provided, use it
    // Otherwise, capture the stack trace for this error
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Export the ApiError class so it can be used in other parts of the application
export { ApiError };

// This custom error class allows us to create more detailed and specific error objects
// It's useful for handling API errors and providing meaningful responses to clients

// The ApiError class is a custom error type for handling specific issues in our application.
// It helps in giving more detailed error information when something goes wrong.
// This class includes:
// - statusCode: The HTTP status code related to the error.
// - message: A text message describing the error. By default, it says "Something went wrong".
// - errors: An array that can hold any number of error messages or details.
// - stack: This is optional and provides the stack trace; if not provided, it captures automatically.
// The constructor is a special method in a class that is automatically called when an instance of the class is created.
// It is primarily used to initialize the newly created object with default or initial state.
// In JavaScript, a constructor method is defined using the 'constructor' keyword followed by a set of parameters and a block of code.
// The parameters allow data to be passed into the object at the time of instantiation, and the code block defines what actions to perform when the object is created.
// For the ApiError class, the constructor accepts four parameters:
// - statusCode: This is an HTTP status code that indicates the type of error (e.g., 404 for Not Found, 500 for Internal Server Error).
// - message: A human-readable message that describes the error. It defaults to "Something went wrong" if not specified.
// - errors: An optional array that can contain additional details about the error. This is useful for providing more context or multiple error messages.
// - stack: An optional parameter that can be used to pass a custom stack trace. If not provided, the constructor uses Error.captureStackTrace to automatically capture the stack trace.
// Inside the constructor, these parameters are used to set properties on the ApiError object, allowing these details to be accessed later in the application.
// This setup is particularly useful for error handling in applications, as it allows errors to be thrown with rich contextual information, making debugging and logging more effective.

// Explanation of Stack Trace:

// In technical terms:
// A stack trace is a report of the active stack frames at a certain point in time during the execution of a program.
// It shows the sequence of function calls that led to the current point of execution, typically when an error occurs.
// Each entry in the stack trace represents a function call, including information like function name, file name, and line number.

// In simple terms:
// Imagine you're following a recipe to bake a cake. You start with the main recipe, then follow sub-recipes for each component.
// If something goes wrong (like burning the cake), a stack trace is like a list showing all the steps you took to get to that point.
// It helps you understand exactly where things went wrong and how you got there.

// In the context of our ApiError class:
// The stack trace helps developers understand the path the code took before encountering an error.
// It's like a breadcrumb trail showing which functions were called and in what order, leading up to the error.
// This is incredibly useful for debugging, as it pinpoints where in the code the error occurred and how it was reached.

// When we use Error.captureStackTrace(this, this.constructor) in our constructor:
// It's like taking a snapshot of the current 'path' the code has taken.
// This snapshot excludes the ApiError constructor itself, making the trace more readable by starting from where ApiError was called.

// By including the stack trace in our custom error:
// We're providing detailed information about where and how the error occurred.
// This makes it much easier for developers to find and fix issues in the application.
