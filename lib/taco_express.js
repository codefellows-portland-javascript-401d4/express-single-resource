const express = require('express');
const path = require('path');
const app = express();
const errorHandler = require('./error_handler');
const taco_routes = require('./routes/taco_routes');

app.use('/tacos', taco_routes);

const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));

app.use(errorHandler);

module.exports = app;
