module.exports = function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-var
  const code = err.code || 400;
  const error = code === 400 ? 'Bad Request!' : err.error;
  console.error(err.error || err.message);
  res.status( code ).send({ error });
};