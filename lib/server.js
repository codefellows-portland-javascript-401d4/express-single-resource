const express = require('express');
const app = express();
const fileStore = require('./dotaTeam');
const parseUrl = require('url').parse;
const qs = require('querystring');
const teams = require('./routes/teams');


app.use('/teams', teams);





// app.get('/teams', (req, res) => {
//   handlers.getAll(req, res);
// });

// app.get('/teams/:id', (req, res)=> {
//   handlers.getSingle(req, res, req.params.id);
// });

// app.post('/teams', (req, res) => {
//   handlers.post(req, res);
// });

// app.put('/teams/:id', (req, res) => {
//   handlers.put(req, res, req.params.id);
// });

// app.delete('/teams/:id', (req, res) => {
//   handlers.destroy(req, res, req.params.id);
// });





module.exports = app;