const express = require('express');
const app = express();
const path = require('path');
const store = require('bad-store');
const publicDir = path.join(__dirname, '../team');
const teamRoute = require('./routes/team-router');



app.use('/team', teamRoute);

module.exports = app;