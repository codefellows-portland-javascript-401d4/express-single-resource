const express = require('express');
const app = express();
const notes = require('./routes/notes');
const errorHandler = require('./error-handler');

app.get('/', (request, response) => {
  response.send('Welcome to single-resource file-store');
});

app.use('/notes', notes);

app.use(errorHandler);

module.exports = app;


// app.get('/notes/:title', (request, response) => {
//   handle.get(request.params.title, request, response);
// });
//
// app.get('/notes', (request, response) => {
//   handle.getAll(request, response);
// });
//
// app.post('/*', (request, response) => {
//   handle.post(request, response);
// });
//
// app.put('/notes/:title', (request, response) => {
//   handle.put(request.params.title, request, response);
// });
//
// app.delete('/notes/:title', (request, response) => {
//   handle.delete(request.params.title, request, response);
// });
