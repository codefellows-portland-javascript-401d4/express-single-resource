const express = require('express');
const app = express();
const teams = require('./routes/teams');
const errorHandler = require('./error-handler');

app.use('/', teams);

app.use(errorHandler);

//could not shift this out to a 'bad-route-handler' and make it work
app.use((req, res, next) => {
  res.status(404);
  res.send('Page not found!');
});

module.exports = app;