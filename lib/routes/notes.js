const express = require('express');
const router = express.Router();
const handle = require('../requestHandler');

router
  .get('/:title', (request, response, next) => {
    console.log('we hit get note for', request.params.title);
    handle.get(request.params.title)
      .then(data => response.send(data))
      .catch(next);
  })

  .get('/', (request, response, next) => {
    console.log('we hit get all');
    handle.getAll()
      .then(data => {
        console.log(data);
        response.set({'content-type': 'text/plain'}).send(data)
      })
      .catch(next);
  });
module.exports = router;

// app.get('/', (request, response) => {
//   response.send('Welcome to single-resource file-store');
// });
//
//
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
