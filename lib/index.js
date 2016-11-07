const express = require('express');
const app = express();
const fs = require('../fsFuncs');

app.get('/cities', (req, res) => {
    fs.getFileList()
        .then((files) => {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            files.forEach(file => {
                res.write(file + '\n');
            });
            res.end();
        })
        .catch((err) => {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write(err.message);
            res.end();
        });
});

app.get('/cities/:id', (req, res) => {
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
});

app.post('/cities', (req, res) => {
    fs.bodyReader(req, (err, data) => {
        fs.createFile(data.name, data.name)
            .then(() => {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write(`File ${data.name}.txt successfully created in \'cities\' directory.`);
                res.end();
            })
            .catch((err) => {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.write(err.message);
                res.end();
            });
    });
});

app.put('/cities', (req, res) => {
    fs.bodyReader(req, (err, data) => {
        fs.replaceFile(data.name, data.name)
            .then(() => {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write(`File ${data.name}.txt successfully replaced.`);
                res.end();
            })
            .catch((err) => {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.write(err.message);
                res.end();
            });
    });
});

app.delete('/cities/:id', (req, res) => {
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
});

module.exports = app;
