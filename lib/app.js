const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const sander = require('sander');
const parseUrl = require('url').parse;
const PUThandler = require('./PUThandler');
const GEThandler = require('./GEThandlers');
const POSThandler = require('./POSThandler');
const DELETEhandler = require('./DELETEhandler');
const publicDir = path.join(__dirname, '../public');
const badRequestHandler = require('./badRequestHandler');
const boardSportsPath = (__dirname).slice(0, -4) + '/data/boardsports/';

app.use(express.static(publicDir));

app.get('/boardsports', (req, res) => {
  GEThandler.dir(req, res, boardSportsPath);
}); 

app.get('/boardsports/:id', (req, res) => {
  GEThandler.file(req, res, boardSportsPath, req.params.id);
});

app.post('/boardsports', (req, res) => {
  POSThandler(req, res, boardSportsPath);
});

app.put('/boardsports', (req, res) => {
  PUThandler(req, res, boardSportsPath);
});

app.delete('/boardsports/:id', (req, res) => {
  DELETEhandler(req, res, boardSportsPath, req.params.id);
});

module.exports = app;
