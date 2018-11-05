const express = require('express');
const router = express.Router();
const crudHandler = require('../crudHandler.js');
const bodyparser = require('../bodyparser');

module.exports = router

.get('/', (req, res, next) => {
  crudHandler.getFileList()
        .then((files) => {
          res.writeHead(200, {'Content-Type': 'text/plain'});
          files.forEach(file => {
            res.write(file + '\n');
          });
          res.end();
        })
        .catch(error => {
          if(error.code === 'ENOENT'){
            res.send([]);
          } else{
            next(error);
          }
        });
})

.get('/:id', (req, res, next) => {
  let id = req.params.id;
  crudHandler.getOneFile(id)
        .then((result) => {
          // res.writeHead(200, {'Content-Type': 'text/plain'});
          console.log('result:' , result);
          res.send(result);
          // res.end();
        })
        .catch((error) => {
          console.log('err: ' , error);
          next(error);
        });
})

.post('/', bodyparser, (req, res, next) => {
  crudHandler.createFile(req.body.name, req.body.name)
          .then(() => {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(`File ${req.body.name}.txt successfully created in \'cities\' directory.`);
            res.end();
          })
          .catch((error) => {
            let errObj = {};
            errObj.code = 500;
            errObj.message = 'Internal server error';
            errObj.error = error;
            next(errObj);
          });
})

.put('/:id', bodyparser, (req, res, next) => {
  //get req.params TODO
  crudHandler.replaceFile(req.body.name, req.body.name)
    .then(() => {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(`File ${req.body.name}.txt successfully replaced.`);
      res.end();
    })
    .catch(next);
})

.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  crudHandler.deleteFile(id)
        .then(() => {
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.write(`File ${id}.txt successfully deleted.`);
          res.end();
        })
        .catch(next);
});
