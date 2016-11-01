const express = require('express');
const router = express.Router();
const getHandler    = require('./getHandler');
const postHandler   = require('./postHandler');
const deleteHandler = require('./deleteHandler');
const putHandler    = require('./putHandler');

function resHandler(res, message, statusCode = 200, encoding = 'text/html', requestHeader = {}, pugFile) {
    var headerType = (requestHeader.hasOwnProperty('content-type')) ? requestHeader['content-type'] : 'text/html';
    res.setHeader('Content-Type', headerType);
    res.status = statusCode;
    if (message === 'ENOENT') message = 'File does not exist';
    if (encoding === 'application/json' && (headerType.indexOf('text') !== -1)) {
        res.render(pugFile, JSON.parse(message));
    } else {
        res.send(message);
    };
};

router
    .get('/*', (req, res) => {
        getHandler(req.params, (err, data, encoding) => {
            if (err) resHandler(res, err.code, 400);
            else resHandler(res, data, null, encoding, req.headers, 'cats');                
        });
    })

    .put('/:id', (req, res) => {
        putHandler(req.params, req, (err, message) => {
            if (err) resHandler(res, err.code, 400);
            else resHandler(res, message);
        });
    })

    .post('/', (req, res) => {
        postHandler(req.params, req, (err, message) => {
            if (err) resHandler(res, err.code, 400);
            else resHandler(res, message);
        });
    })

    .delete('/:id', (req, res) => {
        deleteHandler(req.params, (err, message) => {
            if (err) resHandler(res, err, 400);
            else resHandler(res, message);
        });
    })

    .get('/', (req, res) => {
        res.sendFile('index.html', {root: '.'});
    });

module.exports = router;