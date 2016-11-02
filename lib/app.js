const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const sander = require('sander');
const errorHandler = require('./errorHandler');
const parseUrl = require('url').parse;
const boardsports = require('./boardsports');
const publicDir = path.join(__dirname, '../public');
const badRequestHandler = require('./badRequestHandler');
const boardSportsPath = (__dirname).slice(0, -4) + '/data/boardsports/';

app.use(express.static(publicDir));

app.use('/api/boardsports', boardsports);

app.use(errorHandler);

module.exports = app;
