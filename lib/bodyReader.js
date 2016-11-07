module.exports = function bodyReader(req, res, next) {

  let body = '';

  req.on('data', data => {
    body += data;
  });

  req.on('end', () => {
   
    try {
      req.parsed = JSON.parse(body);
      req.unparsed = body;
      next();
    } catch(err) {
      err.code = '400';
      err.message = 'Invalid JSON';
      next(err);
    }

  });
  
};



