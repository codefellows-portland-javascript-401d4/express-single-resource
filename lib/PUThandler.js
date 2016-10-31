const PUThandler = {};
const sander = require('sander');
const bodyReader = require('./bodyReader');

module.exports = function PUThandler(req, res, directory){
  bodyReader(req, (err, boardSport) => {
    if(err) {
      res.statusCode = 400;
      res.end(err.message);
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      let updatedBoardsport = JSON.parse(boardSport);
      let filePath = directory + updatedBoardsport.name + '.json';
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

