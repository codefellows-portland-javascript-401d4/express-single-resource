'use strict';

const express = require('express');
const app = express();
const bodyreader = require('./body-parser');
const Herding = require('../models/storageScoutFiles');
const error = require('./error-handler');
const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));

app.use('/storageScoutFiles');

app.use(errorHandler);

module.exports = app;
