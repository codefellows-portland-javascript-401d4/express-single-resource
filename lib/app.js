'use strict';

const express = require('express');
const app = express();
const path = require('path');

const herdingGroup = require('./routes/herding-group');
const error = require('./error-handler');

const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

app.use('/', router);

app.use(errorHandler);

module.exports = app;
