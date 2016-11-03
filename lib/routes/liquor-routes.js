const express = require('express');
const ss = require('storage-scout');
const bodyParser = require('../body-parser')();
const router = express.Router();

module.exports = router

  .get('/', (req, res, next) => {
    ss.readAll()
      .then(liquor => res.send(liquor))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    ss.readOne(req.params.id)
      .then(liquor => res.send(liquor))
      .catch(next);
  })
  .post('/', bodyParser, (req, res, next) => {
    ss.create(req.body)
    .then(saved => res.send(saved))
    .catch(next);
  })
  .put('/:id', bodyParser, (req, res, next) => {
    ss.update(req.params.id, req.body)
    .then(saved => res.send(saved))
    .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    ss.delete(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  });
