module.exports = function bodyReader(req, res, next) {
  let body = '';

  req.on('data', data => {
    body += data;
  });

  req.on('end', () => {
    try {
      body = JSON.parse(body);
      req.body = body;
      next();

    }
    catch (err) {
      console.log('body reader error');
      next(err);
    }
  });

};