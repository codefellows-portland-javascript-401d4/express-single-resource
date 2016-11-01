const express       = require('express');
const router        = express.Router();
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
    .get('/*', (req, res, next) => {
        getHandler(req.params //, (err, data, encoding) => {
            // if (err) resHandler(res, err.code, 400);
            // else resHandler(res, data, null, encoding, req.headers, 'cats');
            // resHandler(res, data, null, encoding, req.headers, 'cats');                
        )
        .then(data => resHandler(res, data, 200, 'application/json', req.headers, 'cats'))
        .catch(next);
    })

    .put('/:id', (req, res, next) => {
        putHandler(req.params, req//, (err, message) => {
            // if (err) resHandler(res, err.code, 400);
            // else resHandler(res, message);
        )
        .then(data => resHandler(res, `<h1>put good, your resource id is ${req.params['id']}</h1>`))
        .catch(next);
    })

    .post('/', (req, res, next) => {
        postHandler(req.params, req, (err, message) => {
            if (err) resHandler(res, err.code, 400);
            else resHandler(res, message);
        });
    })

    .delete('/:id', (req, res, next) => {
        deleteHandler(req.params, (err, message) => {
            if (err) resHandler(res, err, 400);
            else resHandler(res, message);
        });
    })

    .get('/', (req, res) => {
        res.sendFile('index.html', {root: '.'});
    });

module.exports = router;