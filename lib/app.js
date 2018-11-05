const express = require('express'); // use express
const app = express(); // designate app == express
const liquor = require('./routes/liquor-routes');
const errorHandler = require('./error-handler');

// routes
app.use('/liquor', liquor);

// error handler
app.use(errorHandler);

module.exports = app;
