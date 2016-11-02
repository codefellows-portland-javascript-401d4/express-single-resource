const express = require('express');
const router = express.Router();
const handle = require('../requestHandler');
const bodyParser = require('../body-parser')();
const err = {};

router
  .get('/:title', (request, response, next) => {
    handle.get(request.params.title)
      .then(data => response.set({'content-type': 'text/plain'}).send(`${data.title} : ${data.body}`))
      .catch(() => {
        err.code = 404;
        err.message = 'Resource not found';
        next(err);
      });
  })

  .get('/', (request, response, next) => {
    handle.getAll()
      .then(data => response.set({'content-type': 'text/plain'}).send(data))
      .catch(next);
  })

  .post('/', bodyParser, (request, response, next) => {
    handle.post(request.body)
      .then(data => response.send(`You have posted : \n ${data.title} : ${data.body}`))
      .catch(next);
  })

  .put('/:title', bodyParser, (request, response, next) => {
    handle.put(request)
      .then(data => response.send(`You have updated a note : \n ${data.title} : ${data.body}`))
      .catch(next);
  })

  .delete('/:title', (request, response, next) => {
    handle.delete(request.params.title)
      .then(() => response.send(`Your note: ${request.params.title} has been deleted!`))
      .catch(() => {
        err.code = 404;
        err.message = 'Resource not found';
        next(err);
      });
  });

module.exports = router;
