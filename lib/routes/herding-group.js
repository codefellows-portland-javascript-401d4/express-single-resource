'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const storageScout = require('storage-scout');
const bodyParser = require('body-parser').json();
const Herding = require('../models/storageScoutFiles');

router
    .get('/herding-group', (request, response) => {
        storageScout.readAll()
            .then(files => response.send(files))
            .catch(error => response.send(error));
    })

    .post('/herding-group', (request, response) => {
        bodyreader (request, (error, body) => {
            if(error) response.send(error)
            storageScout.create(JSON.stringify(body))
                .then(data => response.send(data))
                .catch(error => response.send(error));
        });
    })

    .get('/herding-group/:id', (request, response) => {
        storageScout.readOne(request.params.id)
            .then(id => response.send(id))
            .catch(error => response.send(error));
    })

    .put('/herding-group/:id', (request, response) => {
        bodyreader (request, (error, body) => {
            if(error) response.send(error)
            storageScout.update(request.params.id, JSON.stringify(body))
                .then(data => response.send(data))
                .catch(error => response.send(error));
        });
    })

    .delete('/herding-group/:id', (request, response) => {
        storageScout.delete(request.params.id)
            .then(result => response.send({ result: result }))
            .catch(error => response.send(error));
    });

module.exports = router;
