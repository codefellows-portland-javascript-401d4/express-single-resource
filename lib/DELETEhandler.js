const DELETEhandler = {};
const sander = require('sander');

module.exports = function DELETEhandler(req, res, directory, file) {
  let filePath = directory + file + '.json';
  return sander.unlink(filePath);
};


