const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  // spread the err properties to the customized error
  let error = { ...err };
  // get the custom ErrorResponse class messages as well
  error.message = err.message;

  // log to console for dev
  console.log('\x1b[31m', err.stack);
  console.log(err);

  // mongoose cast to ObjectId failed
  if (err.name === 'CastError') {
    const message = `Resource not found, ${err.value} is not a valid id`;
    error = new ErrorResponse(message, 404);
  }

  // mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate value: ${Object.keys(err.keyValue)[0]}`;
    error = new ErrorResponse(message, 400); // bad request
  }

  // mongoose validation errors
  if (err.name === 'ValidationError') {
    // get all validation errors messages from the err object and put them to a message string
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400); // bad request
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
