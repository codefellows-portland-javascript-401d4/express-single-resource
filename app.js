const express = require('express');
const fs = require('fs');

const resHandler = require('./lib/resHandler.js');
const notes = require('./routes/notes.js');
const errHandler = require('./lib/errHandler');

const app = express();
const indexHtml = fs.createReadStream('./public/index.html');

//app detemines CRUD method
//then sends body to dataStore to handle fs operation
//then sends response to resHandler to handle the response

app.use('/notes', notes);

// serves index.html if GET for '/'
app.get('/', (req, res) => {
  indexHtml.pipe(res);
});

app.use(errHandler);

// error and 400 handling
app.use((req, res) => {
  res.status = 400;
  resHandler.errHandler(res);
});

// //if the pathname is bad
// app.use( (req, res) => {
//   res.status = 400;
//   resHandler.errHandler(res);
// });

module.exports = app;