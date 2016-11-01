'use strict';

const express = require('express');
const app = express();
const path = require('path');
const storageScout = require('storage-scout');
const bodyreader = require('./body-parser');
const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));

// get all files in store
app.get('/herding-group', (request, response) => {
    storageScout.readAll()
        .then(files => response.send(files))
        .catch(error => response.send(error));
});

// post new file to store
app.post('/herding-group', (request, response) => {
    bodyreader (request, (error, body) => {
        if(error) response.send(error)
        storageScout.create(JSON.stringify(body))
            .then(data => response.send(data))
            .catch(error => response.send(error));
    });
});

// get a particular file by id
app.get('/herding-group/:id', (request, response) => {
    storageScout.readOne(request.params.id)
        .then(id => response.send({ id: id }))
        .catch(error => response.send(error));
});

// put 
app.put('/herding-group/:id', (request, response) => {
    bodyreader (request, (error, body) => {
        if(error) response.send(error)
        storageScout.update(request.params.id, JSON.stringify(body))
            .then(data => response.send(data))
            .catch(error => response.send(error));
    });
});

// delete by id
app.delete('/herding-group/:id', (request, response) => {
    storageScout.delete(request.params.id)
        .then(result => response.send({ result: result }))
        .catch(error => response.send(error));
});

module.exports = app;
