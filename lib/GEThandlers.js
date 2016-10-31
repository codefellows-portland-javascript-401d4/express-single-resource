const sander = require('sander');
const GEThandler = {};

GEThandler.dir = function (req, res, directory) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  sander.readdir(directory)
    .then(files => {
      res.write('<h1>The boardsports directory contains the following files:</h1><br>');
      files.forEach(file => {
        res.write('<h2>' + file.slice(0, -5) + '</h2><br>');
      });
      res.end();
    })
  .catch(error => {
    console.log('Error occurred!', error);
    res.statusCode = 400;
    res.write('This file does not exist');
    res.end();
  });
};

GEThandler.file = function (req, res, directory, file) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  let fileLocation = directory + file + '.json';
  sander.readFile(fileLocation)
    .then(fileContents => {
      let sport = JSON.parse(fileContents);
      res.write('Name: ' + sport.name + '<br>Environment: ' + sport.environment + '<br>Weather: ' + sport.weather + '<br>Equipment: ' + sport.equipment);
      res.end();  
    })
    .catch(error => {
      console.log('Error occurred!', error);
      res.statusCode = 400;
      res.write('This file does not exist');
      res.end();
    });
};   
  
module.exports = GEThandler;   
    
    

