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
    GEThandler.dir(req, res, boardSportsPath);
  }) 

  .get('/:id', (req, res, next) => {
    GEThandler.file(req, res, boardSportsPath, req.params.id);
  })

  .post('/', bodyReader, (req, res, next) => {
    POSThandler(req, res, boardSportsPath);
  })

  .put('/', bodyReader, (req, res, next) => {
    PUThandler(req, res, boardSportsPath);
  })

  .delete('/:id', (req, res, next) => {
    DELETEhandler(req, res, boardSportsPath, req.params.id);
  });

module.exports = router;
