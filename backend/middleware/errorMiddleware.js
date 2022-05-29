// internal imports
const { logEvents } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

module.exports = errorHandler;
