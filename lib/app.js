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
// app.get('/herding-group', (request, response) => {
//     response.render('breed info', {
//         title: 'breed info',
//         message: 'an alert, curious, & pleasant herding dog'
//     });
// });

// get all files in store
app.get('/herding-group', (request, response) => {
    storageScout.readAll()
        .then(files => response.send(files))
        .catch(error => console.log(error));
});

// get a particular file by id
app.get('/herding-group/:id', (request, response) => {
    storageScout.readOne(request.params.id)
        .then(breed => response.send(breed))
        .catch(error => console.log(error));
});

// post new file to store
app.post('/herding-group', (request, response) => {
    let body = '';
    request.on('data', data => body += data);
    request.on('end', () => {
        storageScout.create(body)
            .then(object => response.send({ id: id }))
            .catch(error => console.log(error));
    });
});

// put 
// app.put('/herding-group', (request, response) => {

// });

// delete by id
app.delete('/herding-group/:id', (request, response) => {
    storageScout.delete(request.params.id)
        .then(result => response.send({ result: result }))
        .catch(error => console.log(error));
});

module.exports = app;
