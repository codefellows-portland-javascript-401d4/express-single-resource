const express = require('express');
const app = express();
const handle = require('./requestHandler');

app.get('/', (request, response) => {
  response.send('Welcome to single-resource file-store');
});

app.get('/notes/:title', (request, response) => {
  handle.get(request.params.title, request, response);
});

app.get('/notes', (request, response) => {
  handle.getAll(request, response);
});

app.post('/*', (request, response) => {
  handle.post(request, response);
});

app.put('/notes/:title', (request, response) => {
  handle.put(request.params.title, request, response);
});

app.delete('/notes/:title', (request, response) => {
  handle.delete(request.params.title, request, response);
});

module.exports = app;
