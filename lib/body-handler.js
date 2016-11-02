/** Created by Gloria Anholt on 11/1/16. **/



module.exports = function bodyParser(req, res, next) {

  let body = '';
  req.on('data', data => { body += data; });
  req.on('end', () => {
    var filename = req.params.id;
    if (filename.slice(-5) !== '.json') {
      filename += '.json';
    }
    req.body = body;
    req.filename = filename;
    next();
  });
  
};




