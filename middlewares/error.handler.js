
const { ValidationError, ValidationErrorItem } = require('sequelize');
const boom = require('@hapi/boom');


function logErrors (err, req, res, next) {
  console.log("logErrors");
  // console.error(err);
  next(err);
}

function errorHandler (err,req, res, next) {
  console.log("Error Handler");
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });

}

function boomErrorHandler (err,req, res, next) {
  console.log("Boom error handler");
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);

}


function ormErrorHandler(err, req, res, next) {
  console.log("ORM Error Handler");
  console.log(err);
  if (err instanceof ValidationError) {
    console.log("entro a ValidationError");
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  } else {
    console.log("error no encontrado --------------------------");
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }
