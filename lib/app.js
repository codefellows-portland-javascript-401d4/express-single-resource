const express = require('express');
const app = express();
const path = require('path');
const teams = require('./routes/teams');
const errorHandler = require('./error-handler');

const pubDir = path.join(__dirname, '../public');

app.use('/teams', teams);
app.use('/', express.static(pubDir));
app.use(errorHandler);



module.exports = app;