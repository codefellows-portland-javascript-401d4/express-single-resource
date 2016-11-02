const express = require('express');
const app = express();
const teams = require('./routes/teams');
const errorHandler = require('./error-handler');

app.use('/', teams);

app.use(errorHandler);

app.use((req, res, next) => {
  res.status(404);
  res.send('Route not found!');
});

module.exports = app;