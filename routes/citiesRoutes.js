const express = require('express');
const router = express.Router();
const fs = require('../fsFuncs');
const bodyParser = require('../bodyParser');

router
    .get('/cities', (req, res, next) => {
        fs.getFileList()
            .then((files) => {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                files.forEach(file => {
                    res.write(file + '\n');
                });
                res.end();
            })
            // .catch((err) => {
            //     res.writeHead(400, {'Content-Type': 'text/plain'});
            //     res.write(err.message);
            //     res.end();
            // });
            .catch(next);
    })

    .get('/cities/:id', (req, res) => {
        let id = req.params.id;
        fs.getOneFile(id)
            .then((result) => {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write(`${result}`);
                res.end();
            })
            .catch((err) => {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.write(err.message);
                res.end();
            });
    })

    .delete('/cities/:id', (req, res) => {
        let id = req.params.id;
        fs.deleteFile(id)
            .then(() => {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write(`File ${id}.txt successfully deleted.`);
                res.end();
            })
            .catch((err) => {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.write(err.message);
                res.end();
            });
    })

    .post('/cities', bodyParser, (req, res) => {
        let name = req.body.name;
        fs.createFile(name, name)
            .then(() => {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write(`File ${name}.txt successfully created in \'cities\' directory.`);
                res.end();
            })
            .catch((err) => {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.write(err.message);
                res.end();
            });
    })

    .put('/cities', bodyParser, (req, res) => {
        let name = req.body.name;
        fs.replaceFile(name, name)
            .then(() => {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write(`File ${name}.txt successfully replaced.`);
                res.end();
            })
            .catch((err) => {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.write(err.message);
                res.end();
            });
        
    });

module.exports = router;