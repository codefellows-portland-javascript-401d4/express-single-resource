'use strict';

const express = require('express');
const app = express();
const path = require('path');
const storageScout = require('storage-scout');
const bodyreader = require('./body-reader');
const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));

// app.set('view engine', 'pug');

// bonus
// app.get('/acd-breed-info', (request, response) => {
//     response.render('breed info', {
//         title: 'breed info',
//         message: 'an alert, curious, & pleasant herding dog'
//     });
// });

// get all files in store
app.get('/herding', (request, response) => {
    storageScout.readAll()
        .then(group => response.send(group))
        .catch(error => console.log(error));
});

// get a particular file by id
app.get('/herding/:id', (request, response) => {
    storageScout.readOne(request.params.id)
        .then(breed => response.send(breed))
        .catch(error => console.log(error));
});

// post new file to store
app.post('/storageScoutFiles', (request, response) => {
    let body = '';
    request.on('data', data => body += data);
    request.on('end', () => {
        storageScout.create(JSON.stringify(body))
            .then(object => response.send(object.id))
            .catch(error => console.log(error));
    });
});

// delete by id
app.delete('/herding/:id', (request, response) => {
    storageScout.delete(request.params.id)
        .then(result => response.send({ result: result }))
        .catch(error => console.log(error));
});

module.exports = app;
