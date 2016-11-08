const express       = require('express');
const app           = express();
const cats          = require('./routes/cats');
const morgan        = require('morgan');
const log           = morgan('dev');
const errorHandler  = require('./errorHandler');

app.use(log);

app.set('view engine', 'pug');

app.use('/cats', cats);

app.use(errorHandler);

module.exports = app;