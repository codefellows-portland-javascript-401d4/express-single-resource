const express = require('express');
const router = express.Router();
const bodyReader = require('../bodyReader');
const fileStore = require('../models/dotaTeam.js');

router
  .get('/', (req, res, next) => {
    fileStore.readDir(fileStore.path)
    .then(idArr => {
      if (!idArr.length) {
        res.send(idArr);
      }
      return fileStore.getAll(idArr);
    })
    .then(allData => {
      res.header({'Content-Type': 'application/json'});
      res.send(JSON.stringify(allData));
    })
    .catch(next);
  })

  .get('/:id', (req, res, next)=> {
    fileStore.getFile('/' + req.params.id)
      .then(team => {
        res.header({'Content-Type': 'application/json'});
        res.send(team);
      })
      .catch(() => {
        next({
          code: 404,
          message: 'Resource not found'
        });
      });
  })

  .post('/', bodyReader, (req, res, next) => {
    fileStore.createFile(req.body)
      .then(newFile => {
        res.header({'Content-Type': 'applicantion/json', });
        res.send(newFile);
      })
      .catch(() => {
        next({
          code: 400,
          message: 'Bad request'
        });
      });
  })

  .put('/:id', bodyReader, (req, res, next) => {
    return fileStore.readDir(fileStore.path)
      .then(idArr => {
        if (idArr.indexOf(req.params.id) === -1) {
          next({
            code: 404,
            message: 'Resource not found'
          });
        } else {
          fileStore.updateFile(req.body, req.params.id)
            .then(update => {
              res.header({'Content-Type': 'applicantion/json', });
              res.send(update);
            })
            .catch(() => {
              next({
                code: 400,
                message: 'Bad request'
              })
            });
        }
      });
  })

  .delete('/:id', (req, res, next) => {
    // handlers.destroy(req, res, req.params.id);
    fileStore.destroy(req.params.id)
    .then(() => {
      res.header({'Content-Type': 'text/plain'});
      res.send(`resource ${req.params.id} was deleted.`);
    })
    .catch(() => {
      next({
        code: 404,
        message: 'Resource not found'
      });
    });
  });

module.exports = router;