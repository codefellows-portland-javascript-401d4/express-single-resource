'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('../body-parser')();

const Breed = require('../models/breeds');
const storageScout = require('storage-scout');

router
    .get('/herding-group', (request, response, next) => {
        storageScout.readAll()
            .then(data => response.send({ data: data }))
            .catch(next);
    })

    .post('/herding-group', bodyParser, (request, response, next) => {
        bodyParser (request, (error, body) => {
            if(error) response.send(error)
            storageScout.create(JSON.stringify(body))
                .then(data => response.send({ data: data }))
                .catch(next);
        });
    })

    .get('/herding-group/:id', (request, response, next) => {
        storageScout.readOne(request.params.id)
            .then(id => response.send({ id: id }))
            .catch(next);
    })

    .put('/herding-group/:id', bodyParser, (request, response, next) => {
        bodyParser (request, (error, body) => {
            if(error) response.send(error)
            storageScout.update(request.params.id, JSON.stringify(body))
                .then(data => response.send({ data: data }))
                .catch(next);
        });
    })

    .delete('/herding-group/:id', (request, response, next) => {
        storageScout.delete(request.params.id)
            .then(result => response.send({ result: result }))
            .catch(next);
    });

module.exports = router;
