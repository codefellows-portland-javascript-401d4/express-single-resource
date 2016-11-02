'use strict';

const express = require('express');
const router = express.Router(); //eslint-disable-line
const bodyReader = require('../body-reader')();
const sander = require('sander');

router
    .get('/', (req, res, next) => {
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
        .catch(next);
        });
    })

    .get('/:id', (req, res, next) => {
        sander.readFile('./lib/data-store/' + req.params.id + '.json')
        .then(data => res.end(data))
        .catch(next);
    })

    .post('/', bodyReader, (req, res, next) => {
        var id = Date.now();
        sander.writeFile('./lib/data-store/' + id + '.json', JSON.stringify(req.body))
        .then(res.end(id.toString()))
        .catch(next);
    })

    .put('/:id', bodyReader, (req, res, next) => {
        if(req.params.id === null) {
            req.params.id = Date.now();
        }
        sander.writeFile('./lib/data-store/' + req.params.id + '.json', JSON.stringify(req.body))
        .catch(next);
        res.end(req.params.id.toString());
    })

    .delete('/:id', (req, res) => {
        let id = req.params.id;
        sander.unlink('./lib/data-store/' + id + '.json')
        .catch(err => {
            console.error('error', err.message);
        });
        res.end(id);
    });


module.exports = router;