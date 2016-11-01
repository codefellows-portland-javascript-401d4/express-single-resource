const express = require('express');
const app = express();
const cities = require('./routes/citiesRoutes');
const errorHandler = require('./errorHandler');

app.use('/', cities);

app.use(errorHandler);