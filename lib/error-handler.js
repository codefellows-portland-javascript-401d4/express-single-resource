/** Created by Gloria Anholt on 11/1/16. **/

function errorHandler(err, req, res, next) {
  const code = err.code || 500;
  const message = err.code === 500 ? 'Internal Server Error' : err.error;
  console.error(err.error || err.message);
  res.status(code);
  res.send({error: message});
}

module.exports = errorHandler;