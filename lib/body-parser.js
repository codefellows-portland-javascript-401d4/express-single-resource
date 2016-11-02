module.exports = function createBodyParser() {
  return function bodyParser(request, response, next) {
    let body = '';
    request.on('data', data => {
      body += data;
    });

    request.on('end', () => {
      try {
        request.body = JSON.parse(body);
        next();
      }
      catch(err) {
        err.code = 400;
        err.message = 'Ivalid JSON';
        next(err);
      }
    });
  };
};
