const express = require('express');
const app = express();
const path = require('path');
const errorHandler = require('./error-handler');
const teamsRoutes = require('./routes/teams-router');
// const morgan = require('morgan');
// const log = morgan('dev');
// const TeamStore = require('./team-store');
// const teamStore = new TeamStore;
// const bodyReader = require('./body-reader');


// app.use(log);
const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

app.use('/teams', teamsRoutes);

app.use(errorHandler);

module.exports = app;


