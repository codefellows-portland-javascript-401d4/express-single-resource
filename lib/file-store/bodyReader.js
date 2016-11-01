module.exports = function bodyReader(req, res, next) {
  let body = '';

  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    //should there be a try/catch in here for errors?
    req.body = JSON.parse(body);
    next();
  });

};