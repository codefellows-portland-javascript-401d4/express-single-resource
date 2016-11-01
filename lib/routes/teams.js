const express = require('express');
const path = require('path');
const router = express.Router();
const bodyReader = require('../file-store/bodyReader.js');
const fileStore = require('../file-store/fileStore.js');

router
  .get('/', (req, res, next) => {
    fileStore.readDir(fileStore.path)
      .then(idArr => {
        return fileStore.getAll(idArr);
      })
      .then(allFiles => {
        res.send(allFiles);
      })
      .catch( () => {
        next({
          code: 500,
          message: 'Something exploded'
        });
      });
  })

  .get('/:id', (req, res, next) => {
    fileStore.getFile(req.params.id)
      .then(file => {
        //Not sure why I had to manually set the res type? Otherwise response type was text/plain
        res.header({'Content-Type': 'application/JSON'});
        res.send(file);
      })
      .catch( () => {
        next({
          code: 404,
          message: 'Resource not found'
        });
      });
  })

  .post('/', bodyReader, (req, res, next) => {
    fileStore.createFile(req.body)
      .then(newFile => {
        res.header({'Content-Type': 'application/JSON'});
        res.send(newFile);
      })
      .catch( () => {
        next({
          code: 400,
          message: 'Bad request'
        });
      });
  })

  .put('/:id', bodyReader, (req, res, next) => {
    fileStore.readDir(fileStore.path)
      .then(idArr => {
        if (idArr.indexOf(req.params.id) === -1) {
          res.header(404, {'Content-Type': 'text/plain'});
          res.send('Resource does not exist!'); 
        } else {
          fileStore.updateFile(req.body, req.params.id)
            .then(file => {
              res.header({'Content-Type': 'application/JSON'});
              res.send(file);
            })
            .catch( () => {
              next({
                code: 400,
                message: 'Bad request'
              });
            });
        }
      });
  })

  .delete('/:id', (req, res, next) => {
    fileStore.destroy(req.params.id)
      .then(file => {
        res.send('Resource deleted.');
      })
      .catch( () => {
        next({
          code: 404,
          message: 'Resource not found'
        });
      });
  });


module.exports = router;