const express = require('express');
const router = express.Router();
const bodyreader = require('../bodyreader')();
// const Heros = require('../models/superheros');
const sander = require('sander');

const id = Date.now();

router
  .get('/', (req, res, next) => {
      res.write('<h1>Welcome to the homepage!</h1>');
      sander.readdir('./lib/data-store')
      .then(fileData => {
          var fileArray = fileData.map((fileName) => {
              var fileNameComplete = './lib/data-store/' + fileName;
              return sander.readFile(fileNameComplete);
          });
          Promise.all(fileArray)
        .then(data => {
            res.end(data.join(','));
        })
      .catch(next);
      });
  })
  
  .get('/:id', (req, res, next) => {
      sander.readFile('./lib/data-store/' + req.params.id + '.json')
    .then(data =>{
        res.end(data);
    })
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
      sander.unlink('./lib/data-store/' + req.params.id + '.json')
      .then(() => {
          res.end(id.toString());
      })
      .catch(next);
  })

  .post('/', bodyreader, (req, res, next) => {
      sander.writeFile('./lib/data-store/', id + '.json', JSON.stringify(req.body))
      .then(() => {
          res.end(id.toString());
      })
      .catch(next);
  })

  .put('/:id', bodyreader, (req, res, next) => {
      if(req.params.id === null) {
          req.params.id = id;
      }
      sander.writeFile('./lib/data-store/', req.params.id + '.json', JSON.stringify(req.body))
        .then(() => {
            res.end(id.toString());
        })
      .catch(next);
  });

module.exports = router;
