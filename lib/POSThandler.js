const POSThandler = {};
const sander = require('sander');
const bodyReader = require('./bodyReader');

module.exports = function POSThandler(req, res, directory){
  bodyReader(req, (err, boardSport) => {
    if(err) {
      res.statusCode = 400;
      res.end(err.message);
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      let newBoardsport = JSON.parse(boardSport);
      let filePath = directory + newBoardsport.name + '.json';
      sander.writeFile(filePath, boardSport)
        .then(data => {
          res.write(boardSport);
          res.end();
        })
        .catch(error => {
          console.log('Error occurred!', error);
        });
    }
  });
};


