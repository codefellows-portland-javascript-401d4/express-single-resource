const express = require('express');
const router = express.Router();
const bodyReader = require('../file-store/bodyReader.js');
const fileStore = require('../file-store/fileStore.js');

router
  .get('/teams', (req, res, next) => {
    fileStore.readDir(fileStore.path)
      .then(idArr => {
        return fileStore.getAll(idArr);
      })
      .then(allFiles => {
        res.send(allFiles);
      })
      .catch(next);
  })

  .get('/teams/:id', (req, res, next) => {
    fileStore.getFile(req.params.id)
      .then(file => {
        //Not sure why I had to manually set the res type? Otherwise response type was text/plain
        res.header({'Content-Type': 'application/JSON'});
        res.send(file);
      })
      .catch(next);
  })

  .post('/teams', bodyReader, (req, res, next) => {
    fileStore.createFile(req.body)
      .then(newFile => {
        res.header({'Content-Type': 'application/JSON'});
        res.send(newFile);
      })
      .catch(next);
  })

  .put('/teams/:id', bodyReader, (req, res) => {
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
            .catch(next);
        }
      });
  })

  .delete('/teams/:id', (req, res) => {
    fileStore.destroy(req.params.id)
      .then(file => {
        res.send('Resource deleted.');
      })
      .catch(next);
  });


module.exports = router;