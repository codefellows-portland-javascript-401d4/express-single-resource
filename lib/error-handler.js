module.exports = function errorHandler(err, request, response, next) { //eslint-disable-line
  const code = err.code || 500;
  let message = null;
  if(err.message) {
    message = err.message;
  } else {
    message = 'ERROR ERROR ERROR';
  }
  console.error(message);
  response.status(code).send(message);
};
