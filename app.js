const express = require('express');
const path = require('path');

const dataStore = require('./lib/dataStore');
const readBody = require('./lib/readBody.js');
const resHandler = require('./lib/resHandler.js');

const app = express();
const notesDir = path.join(__dirname, '../notes');

//app detemines CRUD method
//then sends body to dataStore to handle fs operation
//then sends response to resHandler to handle the response
// serves index.html if GET for '/'
app.use(express.static(notesDir));

// server /notes directory list if GET for '/notes'
app.get('/notes', (req, res) => {
  const relPath = '.' + req.url;

  dataStore.retrieveDir(relPath)
    .then((data) => {
      resHandler.writeDir(data, res);
    })
    .catch((err) => {
      res.statusCode = 500;
      resHandler.errHandler(res);
      console.log(err);
    });
});

// serves /notes/filename if GET for /notes/filename
app.get('/notes/*.json', (req, res) => {
  const relPath = '.' + req.url;

  dataStore.retrieveFile(relPath)
    .then((data) => {
      resHandler.writeFile(data, res);
    })
    .catch((err, data) => {
      if (!data) {
        res.statusCode = 410;
        resHandler.errHandler(res);
        console.log(err);
      }else{
        res.statusCode = 500;
        resHandler.errHandler(res);
        console.log(err);
      }
      res.end();
    });
});

app.post('/notes/*.json', (req, res) => {
  const pathObj = path.parse(req.url);
  const relPath = '.' + req.url;
  const dirName = pathObj.dir;
  const relDirName = '.' + dirName;
  const filename = pathObj.base;

  readBody(req)
    .then((body) => {
      dataStore.stash(relPath, body, filename, relDirName);
    })
    .then((data) => {
      resHandler.writeStashMsg(res, data);
    })
  .catch((err) => {
    res.statusCode = 500;
    resHandler.errHandler(res);
    console.log(err);
  });
});

app.put('/notes/*.json', (req, res) => {
  const pathObj = path.parse(req.url);
  const relPath = '.' + req.url;
  const dirName = pathObj.dir;
  const relDirName = '.' + dirName;
  const filename = pathObj.base;

  readBody(req)
    .then((body) => {
      dataStore.stash(relPath, body, filename, relDirName);
    })
    .then((data) => {
      resHandler.writeStashMsg(res, data);
    })
  .catch((err) => {
    res.statusCode = 500;
    resHandler.errHandler(res);
    console.log(err);
  });
});

app.delete('notes/*.json', (req, res) => {
  const relPath = '.' + req.url;
  console.log(relPath);
  dataStore.remove(relPath)
    .then(() => {
      resHandler.writeDeleteMsg(res);
    })
    .catch((err) => {
      res.statusCode = 404;
      resHandler.errHandler(res);
      console.log(err);
    });
});

app.use( (req, res) => {
  res.status = 400;
  resHandler.errHandler(res);
});

module.exports = app;