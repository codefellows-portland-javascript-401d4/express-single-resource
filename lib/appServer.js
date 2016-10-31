const express       = require('express');
const app           = express();
const url           = require('url');
const urlParse      = url.parse;
const path          = require('path');
const getHandler    = require('./getHandler');
const postHandler   = require('./postHandler');
const deleteHandler = require('./deleteHandler');
const putHandler    = require('./putHandler');

// const server = http.createServer((req, res) => {
// const urlString     = urlParse(req.url);
// const urlPath       = urlString.pathname;
// const parsedPath    = path.parse(urlPath);

function resHandler(res, message, statusCode = 200, encoding = 'text/plain') {
    res.setHeader('Content-Type', encoding);
    res.status = statusCode;
    if (message === 'ENOENT') message = 'File does not exist';
    res.send(message);
};

app.get('/cats/*', (req, res) => {
    getHandler(req.params, (err, data, encoding) => {
        if (err) resHandler(res, err.code, 400);
        else resHandler(res, data, null, encoding);                
    });
});

app.put('/cats/:id', (req, res) => {
    console.log(req);
    putHandler(parsedPath, req, (err, message) => {
        if (err) resHandler(err, 400);
        else resHandler(message);
    });
});

app.post('/cats/:id', (req, res) => {
    console.log(req);
    postHandler(parsedPath, req, (err, message) => {
        if (err) resHandler(err, 400);
        else resHandler(message);
    });
});

app.delete('/cats/:id', (req, res) => {
    deleteHandler(parsedPath, (err, message) => {
        if (err) resHandler(err, 400);
        else resHandler(message);
    });
})
    // if (req.method === 'GET') {
    //     getHandler(parsedPath, (err, data, encoding) => {
    //         if (err) resHandler(err.code, 400);
    //         else resHandler(data, null, encoding);                
    //     });
    // } else if (req.method === 'PUT') {
    //     putHandler(parsedPath, req, (err, message) => {
    //         if (err) resHandler(err, 400);
    //         else resHandler(message);
    //     });
    // } else if (req.method === 'POST') {
    //     postHandler(parsedPath, req, (err, message) => {
    //         if (err) resHandler(err, 400);
    //         else resHandler(message);
    //     });
    // } else if (req.method === 'DELETE') {
    //     deleteHandler(parsedPath, (err, message) => {
    //         if (err) resHandler(err, 400);
    //         else resHandler(message);
    //     });
    // } else {
    //     resHandler('not found', 404);
    // };
// });

module.exports = app;