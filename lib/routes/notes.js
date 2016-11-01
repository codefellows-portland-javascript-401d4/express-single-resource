const express = require('express');
const router = express.Router();
const handle = require('../requestHandler');
const bodyParser = require('../body-parser')();

router
  .get('/:title', (request, response, next) => {
    handle.get(request.params.title)
      .then(data => response.send(data))
      .catch(next);
  })

  .get('/', (request, response, next) => {
    handle.getAll()
      .then(data => response.set({'content-type': 'text/plain'}).send(data))
      .catch(next);
  })

  .post('/', bodyParser, (request, response, next) => {
    console.log('post request');
    handle.post(request.body)
      .then(data => response.send(`You have posted : \n ${data.title} : ${data.body}`))
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
