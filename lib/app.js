const express       = require('express');
const app           = express();
const getHandler    = require('./getHandler');
const postHandler   = require('./postHandler');
const deleteHandler = require('./deleteHandler');
const putHandler    = require('./putHandler');


app.get('/cats/', (req, res) => {
    // console.log('****req.params*****', req.params);
    // console.log('requrl', req.url);
    // console.log('*****req*****', req);
    getHandler(req, (err, data, encoding) => {
        if (err) res.send(res, err.code, 400);
        else res.send(data, null, encoding);                
    });

});

// app.get('/cats/:id', (req, res) => {
//     // console.log('****req.params*****', req.params);
//     // console.log('requrl', req.url);
//     // console.log('*****req*****', req);
//     getHandler(req, (err, data, encoding) => {
//         if (err) res.send(res, err.code, 400);
//         else res.send(data, null, encoding);                
//     });

// });

app.put('/cats/:id', (req, res) => {
    putHandler(req.params, req, (err, message) => {
        if (err) res.send(res, err.code, 400);
        else res.send(message);
    });

});

app.post('/cats', (req, res) => {
    postHandler(req.params, req, (err, message) => {
        if (err) res.send(res, err.code, 400);
        else res.send(message);
    });
});

app.delete('/cats/:id', (req, res) => {
    deleteHandler(req.params, (err, message) => {
        if (err) res.send(err, 400);
        else res.send(message);
    });
});

module.exports = app;