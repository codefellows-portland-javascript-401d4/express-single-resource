const express = require('express');
const path = require('path');

const router = require('./router');
const app = express();

// routes go here
app.use( '/', router);

module.exports = app;
