module.exports = function readBody(req, res, next) {
  let body = '';

  req.on('data', (data) => {
    body += data;
    res.body = JSON.parse(body);
  });

  req.on('end', () => {
    try {
      next();
    }
    catch (err) {
      next(err);
    }
  });
};