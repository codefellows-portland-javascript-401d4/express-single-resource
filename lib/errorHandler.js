module.exports = function errorHandler(err, req, res, next) { // eslint-disable-line
  console.log('errorhandler err: ', err);
  const code = err.code || 500;
  const error = code === 500 ? 'Internal Server Error': err.error; // if code is === 500, then error is equal to internal server error. if not, error = err.error
  console.error(err.error || err.message);
  res.status(code).send({error});
};
