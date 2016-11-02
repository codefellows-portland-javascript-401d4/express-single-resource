'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');

const storageScout = require('storage-scout');
const bodyParser = require('bodyParser')();
const Herding = require('./models/storageScoutFiles');

router
    .get('/herding-group', (request, response, next) => {
        storageScout.readAll()
            .then(files => response.send(files))
            .catch(next);
    })

    .post('/herding-group', (request, response, next) => {
        bodyreader (request, (error, body) => {
            if(error) response.send(error)
            storageScout.create(JSON.stringify(body))
                .then(data => response.send(data))
                .catch(next);
        });
    })

    .get('/herding-group/:id', (request, response, next) => {
        storageScout.readOne(request.params.id)
            .then(id => response.send(id))
            .catch(next);
    })

    .put('/herding-group/:id', (request, response, next) => {
        bodyreader (request, (error, body) => {
            if(error) response.send(error)
            storageScout.update(request.params.id, JSON.stringify(body))
                .then(data => response.send(data))
                .catch(next);
        });
    })

    .delete('/herding-group/:id', (request, response, next) => {
        storageScout.delete(request.params.id)
            .then(result => response.send({ result: result }))
            .catch(next);
    });

module.exports = router;
