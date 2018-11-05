const express = require('express');
const app = express();
const fileStore = require('./models/dotaTeam');
const parseUrl = require('url').parse;
const qs = require('querystring');
const teams = require('./routes/teams');
const errorHandler = require('./error-handler');


app.use('/teams', teams);
app.use(errorHandler);



module.exports = app;