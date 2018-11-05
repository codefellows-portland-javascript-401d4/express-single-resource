'use strict';

const express = require('express');
const app = express();
const path = require('path');
const heroes = require('./routes/heroes');
const errorHandler = require('./error-handler');

const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));

app.use('/superheroes', heroes);

app.use(errorHandler);

module.exports = app;