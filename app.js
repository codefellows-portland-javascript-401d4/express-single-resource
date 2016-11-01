const express = require('express');
const app = express();
const cities = require('./routes/citiesRoutes');
// const errorHandler;

app.use('/', cities);