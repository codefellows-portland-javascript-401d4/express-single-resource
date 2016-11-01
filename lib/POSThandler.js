const POSThandler = {};
const sander = require('sander');

module.exports = function POSThandler(req, res, directory){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  let filePath = directory + req.parsed.name + '.json';
  sander.writeFile(filePath, req.parsed)
    .then(data => {
      res.write(req.parsed);
      res.end();
    })
    .catch(error => {
      console.log('Error occurred!', error);
    });
};



