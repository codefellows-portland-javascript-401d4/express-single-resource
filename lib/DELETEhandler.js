const DELETEhandler = {};
const sander = require('sander');
const bodyReader = require('./bodyReader');

module.exports = function DELETEhandler(req, res, directory, file) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  let filePath = directory + file + '.json';
  sander.unlink(filePath)
    .then(() => {
      res.write('<h2>You successfully deleted the ' + file + ' file.</h2>');
      res.end();
    })
    .catch(error => {
      console.log('Error occurred!', error);
      res.statusCode = 400;
      res.write('This file does not exist');
      res.end();
    });
};


