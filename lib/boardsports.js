const express = require('express');
const router = express.Router();
const PUThandler = require('./PUThandler');
const GEThandler = require('./GEThandlers');
const POSThandler = require('./POSThandler');
const DELETEhandler = require('./DELETEhandler');
const bodyReader = require('./bodyReader');
const boardSportsPath = (__dirname).slice(0, -4) + '/data/boardsports/';

router

  .get('/', (req, res, next) => {
    GEThandler.dir(req, res, boardSportsPath)
      .then(files => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<h1>The boardsports directory contains the following files:</h1><br>');
        files.forEach(file => {
          res.write('<h2>' + file.slice(0, -5) + '</h2><br>');
        });
        res.end();
      })
      .catch(err => {
        err.code = 400;
        err.message = 'This file does not exist';
        next(err);
      });
  }) 

  .get('/:id', (req, res, next) => {
    GEThandler.file(req, res, boardSportsPath, req.params.id)
      .then(fileContents => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        let sport = JSON.parse(fileContents);
        res.write('Name: ' + sport.name + '<br>Environment: ' + sport.environment + '<br>Weather: ' + sport.weather + '<br>Equipment: ' + sport.equipment);
        res.end();  
      })
      .catch(err => {
        err.code = 400;
        err.message = 'This file does not exist';
        next(err);
      });
  })

  .post('/', bodyReader, (req, res, next) => {
    POSThandler(req, res, boardSportsPath)
      .then(data => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(req.unparsed);
        res.end();
      })
      .catch(err => {
        err.code = 500;
        err.message = 'Sorry, we goofed and your entry did not post';
        next(err);
      });
  })

  .put('/', bodyReader, (req, res, next) => {
    PUThandler(req, res, boardSportsPath)
      .then(data => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(req.unparsed);
        res.end();
      })
      .catch(err => {
        err.code = 500;
        err.message = 'Sorry, we goofed and your entry did not post';
        next(err);     
      });
  })

  .delete('/:id', (req, res, next) => {
    DELETEhandler(req, res, boardSportsPath, req.params.id)
      .then(() => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<h2>You successfully deleted the ' + req.params.id + ' file.</h2>');
        res.end();
      })
      .catch(err => {
        err.code = 400;
        err.message = 'This file does not exist';
        next(err);
      });
  });

module.exports = router;
