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

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
