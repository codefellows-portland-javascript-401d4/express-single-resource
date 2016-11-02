module.exports = function readBody(req, res, next) {
  let body = '';

  req.on('data', (data) => {
    body += data;
    console.log('body piece', body);
    res.body = JSON.parse(body);
    console.log(res.body);
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