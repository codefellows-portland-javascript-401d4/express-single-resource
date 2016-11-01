const PUThandler = {};
const sander = require('sander');


module.exports = function PUThandler(req, res, directory){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  let filePath = directory + req.parsed.name + '.json';
  sander.writeFile(filePath, req.parsed)
    .then(data => {
      res.write(req.parsed);
      res.end();
    })
    .catch(error => {
      console.log('PUT Error occurred!', error);
    });
};

