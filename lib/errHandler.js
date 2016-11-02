const resHandler = require('./resHandler');

module.exports = function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-var
  console.log(res.status, err);
  resHandler.errHandler(res);
};


