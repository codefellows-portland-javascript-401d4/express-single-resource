const GEThandler = {};
const sander = require('sander');

GEThandler.dir = function (req, res, directory) {
  return sander.readdir(directory);
};

GEThandler.file = function (req, res, directory, file) {
  let fileLocation = directory + file + '.json';
  return sander.readFile(fileLocation);
};   
  
module.exports = GEThandler;   
    
    

