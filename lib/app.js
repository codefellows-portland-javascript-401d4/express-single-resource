const express = require('express');
const router = require('./router');
const app = express();
const errorHandler = require('./errorHandler');

// routes go here
app.use( '/', router);
//the catch(then) bubbles down to here and calls the error handler.
app.use(errorHandler);

module.exports = app;
