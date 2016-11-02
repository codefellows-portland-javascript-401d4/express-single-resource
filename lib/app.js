const express = require('express');
const app = express();
const superheros = require('./routes/superheros');
const errorHandler = require('./error-handler');
// const path = require('path');

// const publicDir = path.join(__dirname, '../public');
// app.use(express.static(publicDir));

// app.set('view engine', 'pug');

app.use('/superheros', superheros);

app.use(errorHandler);
    
module.exports = app;