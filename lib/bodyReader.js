module.exports = function bodyReader(req, res, next) {

  let body = '';

  req.on('data', data => {
    body += data;
  });

  req.on('end', () => {
    req.parsed = JSON.parse(body);
    console.log(req.parsed);
    next();
  });
  
};



