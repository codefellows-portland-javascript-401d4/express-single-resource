const POSThandler = {};
const sander = require('sander');

module.exports = function POSThandler(req, res, directory){
  let filePath = directory + req.parsed.name + '.json';
  return sander.writeFile(filePath, req.unparsed);
};



