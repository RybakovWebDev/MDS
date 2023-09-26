const errorHelper = (err, message, status, next) => {
  console.log("This is the error message on helper: ", message);
  err.message = message || err.message;
  err.status = status || err.code || err.status;
  console.error(err);
  return next(err);
};

module.exports = { errorHelper };
