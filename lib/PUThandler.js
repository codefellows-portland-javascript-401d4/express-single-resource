const PUThandler = {};
const sander = require('sander');


module.exports = function PUThandler(req, res, directory){
  let filePath = directory + req.parsed.name + '.json';
  return sander.writeFile(filePath, req.unparsed);
};

