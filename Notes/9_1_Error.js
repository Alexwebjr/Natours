/* //?=========== NDB ==========
Description: Opens a debug console

1. Install
npm i ndb --save-dev

2. Run command
ndb server.js


*/

/*=========== HANDLING ROUTES ==========

  app.all('*', (req, res) => {
    res.status(404).json({
      status: 'fail',
      message: `Can't find ${req.originalUrl} on this server!`,
    });
  }); //Default handling route
*/

/*===========  Error Middelware  ==========
//Erro Route
app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;

  next(err);
});

//Error Middelware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
  });
});

*/

/*============ CLASS ERROR ===========
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

-------------------------
//Error Route
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

*/

/*=============== Catching Async
//? helper
module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
}; //* call back for middleware

//* controller
exports.createTour = catchAsync(async (req, res) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});
 
 */

/*=============== Catching AppError

//controller
exports.updateTour = catchAsync(async (req, res) => {
  const tour = await ...

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  } //error app

  res.status...
});
 
 */

/*================ Error during Dev vs Prod ================

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //* Operational, trusted error: send msn to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    //* Programing or unknown error: don't leak error details
  } else {
    //1. Log error
    console.error('Error 💥', err);
    //2. Send generic msn
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  }
};
*/

/*============= Handler Error DB =============
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
          error = handleValidationErrorDB(error);

    sendErrorProd(err, res);
  }
};

*/

/*============= Outside Express: Uncaught Exceptions =============
//* in Server

//Error
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err);

  //process.exit(1); //agresive
  server.close(() => {
    process.exit(1);
  });
});

//Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.log('UNHANDLED EXCEPTION! 💥 Shutting down...');
  console.log(err);

  server.close(() => {
    process.exit(1);
  });
});
*/
