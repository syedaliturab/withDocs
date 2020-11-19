const ErrorUtil = require('./../utils/ErrorUtil');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new ErrorUtil(message, 400);
};

const handleDuplicateFieldsDB = (err) => {

  var message;
  if(err.keyValue.email){
    message = `Eamil ${err.keyValue.email} already exists. Please use another!`;
  } else if(err.keyValue.contact) {
    message = `Contact No ${err.keyValue.contact} already exists. Please use another!`;
  } else {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    message = `${value} already exists. Please use another!`;
  }
  console.log(message)
  return new ErrorUtil(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new ErrorUtil(message, 400);
};

const handleJWTError = () =>
  new ErrorUtil('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new ErrorUtil('Your token has expired! Please log in again.', 401);
const devError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
const prodError = (err, res) => {
  if (err.isOperational) {
    // Operational, trusted error: send message to client

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } // Programming or other unknown error: don't leak error details
  else {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';
  if (process.env.NODE_ENV === 'development') {
    devError(err, res);
  }
  let error = { ...err };
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (process.env.NODE_ENV === 'production') {
    // console.log(error);
    let error = { ...err };
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    prodError(error, res);
  }
};
