const express = require('express');
const path = require('path');

const dataStore = require('../lib/dataStore.js');
const readBody = require('../lib/readBody.js');
const resHandler = require('../lib/resHandler.js');

const router = express.Router();
const filePath = path.join(__dirname, '../notes');

router
  // serves /notes directory list if GET for '/notes'
  .get('/', (req, res, next) => {
    dataStore.retrieveDir(filePath)
      .then((data) => {
        resHandler.writeDir(data, res);
      })
      .catch((err) => {
        res.statusCode = 500;
        next(err);
      });
  })
  // serves /notes/filename if GET for /notes/filename
  // user only needs to input the name, not the extension
  .get('/:id', (req, res, next) => {
    dataStore.retrieveFile(req.params.id)
      .then((data) => {
        resHandler.writeFile(data, res);
      })
      .catch((err, data) => {
        (!data) ? res.status = 410 : res.status = 500;
        next(err);
      });
  })
  .post('/:id', readBody, (req, res, next) => {
    console.log(req.params.id);
    dataStore.stash(req.params.id, req.body)
      .then(() => {
        resHandler.writeStashMsg(res);
      })
      .catch((err) => {
        res.statusCode = 500;
        next(err);
      });
  })
  .put('/:id', readBody, (req, res, next) => {
    dataStore.update(req.params.id, req.body)
      .then(() => {
        resHandler.writeUpdateMsg(res);
      })
      .catch((err) => {
        res.statusCode = 500;
        next(err);
      });
  })
  .delete('/:id', (req, res, next) => {
    dataStore.remove(req.params.id)
      .then(() => {
        resHandler.writeDeleteMsg(res);
      })
      .catch((err) => {
        console.log(err);
        res.statusCode = 404;
        next(err);
      });
  });

module.exports = router;