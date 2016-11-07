'use strict';

const express = require('express');
const app = express();
// const qs = require('querystring');
// const parseUrl = require('url').parse;
const sander = require('sander');
const bodyreader = require('./bodyreader');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));

// const url = parseUrl(req.url);
// const queryObj = qs.parse(url.query);
// console.log ('queryObj', queryObj);
// console.log ('url.query', url.query);

app.get('/superheroes', (req, res) => {
    sander.readdir('./lib/data-store')
    .then(fileData => {
        var fileArray = fileData.map((fileName) => {
            var fileNameComplete = 'lib/data-store/' + fileName;
            return sander.readFile(fileNameComplete);
        });
        Promise.all(fileArray)
    .then(data => {
        res.end(data.join(','));
    })
    .catch(err => {
        console.error('error', err.message);
    });
    });
});

app.get('/superheroes/:id', (req, res) => {
    sander.readFile('./lib/data-store/' + req.params.id + '.json')
    .then(data => res.end(data))
    .catch(err =>{
        console.error('error', err.message);
        res.statusCode = 400;
        res.end('That resource does not exist');
    });
});

app.post('/superheroes', (req, res) => {
    var id = Date.now();
    bodyreader(req, (err,data) => {
        sander.writeFile('./lib/data-store/', id + '.json', JSON.stringify(data))
        .catch(err =>{
            console.error('error', err.message);
        });
    });
    res.end(id.toString());
});

app.put('/superheroes/:id', (req, res) => {
    if(req.params.id === null) {
        req.params.id = Date.now();
    }
    bodyreader(req, (err,data) => {
        sander.writeFile('./lib/data-store/' + req.params.id + '.json', JSON.stringify(data))
        .catch(err => {
            console.error('error', err.message);
        });
    });
    res.end(id.toString());
});
app.delete('/superheroes/:id', (req, res) => {
    let id = req.params.id;
    sander.unlink('./lib/data-store/' + id + '.json')
    .catch(err => {
        console.error('error', err.message);
    });
    res.end(id);
});

module.exports = app;