module.exports = function errorHandler(err, request, response, next) { //eslint-disable-line
  const code = err.code;
  console.error(err.message);
  response.status(code).send(err.message);
};
