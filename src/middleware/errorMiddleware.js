const { ValidationError } = require("../utils/error");

exports.errorMiddleware = (error, req, res, next) => {
  console.log(error);

  const customErrorResponse = {
    statusCode: error.statusCode || 500,
    message: error.message,
  };

  if (error.name === "CastError") {
    customErrorResponse.statusCode = 404;
    customErrorResponse.message = "That id does not exist silly!";
  }

  if (error instanceof ValidationError) {
    customErrorResponse.validatonErrors = error.validationErrors;
  }

  // prettier-ignore
  return res
  .status(customErrorResponse.statusCode)
  .json(customErrorResponse);
};
