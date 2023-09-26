const multer = require("multer");

const errorHandler = (error, req, res, next) => {
  let status;
  let message;

  if (error instanceof multer.MulterError) {
    status = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
    message = error.message;
  } else if (error.$metadata && error.$metadata.httpStatusCode) {
    status = error.$metadata.httpStatusCode;
    message = error.customMessage;
  } else if (error.code || error.status) {
    status = error.code || error.status;
    message = error.customMessage || error.message;
  } else if (error.customMessage) {
    status = 500;
    message = error.customMessage;
  } else if (error.message) {
    status = 500;
    message = error.message;
  } else {
    status = 500;
    message = "An unknown error occurred";
  }

  res.status(status).json({ error: message });
};

module.exports = { errorHandler };
