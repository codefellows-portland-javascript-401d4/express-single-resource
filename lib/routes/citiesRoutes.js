const express = require('express');
const router = express.Router();
const datastore = require('../models/datastoreFuncs');
const bodyParser = require('../bodyParser');

router
    .get('/cities', (req, res, next) => {
        datastore.getFileList()
            .then((files) => {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                files.forEach(file => {
                    res.write(file + '\n');
                });
                res.end();
            })
            .catch(next);
    })

    .get('/cities/:id', (req, res, next) => {
        let id = req.params.id;
        datastore.getOneFile(id)
            .then((result) => {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write(`${result}`);
                res.end();
            })
            .catch(next);
    })

    .delete('/cities/:id', (req, res, next) => {
        let id = req.params.id;
        datastore.deleteFile(id)
            .then(() => {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write(`File ${id}.txt successfully deleted.`);
                res.end();
            })
            .catch(next);
    })

    .post('/cities', bodyParser, (req, res, next) => {
        let name = req.body.name;
        datastore.createFile(name, name)
            .then(() => {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write(`File ${name}.txt successfully created in \'cities\' directory.`);
                res.end();
            })
            .catch(next);
    })

    .put('/cities', bodyParser, (req, res, next) => {
        let name = req.body.name;
        datastore.replaceFile(name, name)
            .then(() => {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write(`File ${name}.txt successfully replaced.`);
                res.end();
            })
            .catch(next);
        
    });

module.exports = router;