const express       = require('express');
const app           = express();
const cats          = require('./routes/cats');
// const getHandler    = require('./routes/getHandler');
// const postHandler   = require('./routes/postHandler');
// const deleteHandler = require('./routes/deleteHandler');
// const putHandler    = require('./routes/putHandler');
const morgan        = require('morgan');
const log           = morgan('dev');
const fs = require('fs');

// function resHandler(res, message, statusCode = 200, encoding = 'text/html', requestHeader = {}, pugFile) {
//     var headerType = (requestHeader.hasOwnProperty('content-type')) ? requestHeader['content-type'] : 'text/html';
//     res.setHeader('Content-Type', headerType);
//     res.status = statusCode;
//     if (message === 'ENOENT') message = 'File does not exist';
//     if (encoding === 'application/json' && (headerType.indexOf('text') !== -1)) {
//         res.render(pugFile, JSON.parse(message));
//     } else {
//         res.send(message);
//     };
// };

app.use(log);

app.set('view engine', 'pug');

app.use('/cats', cats);

// app.get('/cats*', (req, res) => {
//     getHandler(req.params, (err, data, encoding) => {
//         if (err) resHandler(res, err.code, 400);
//         else resHandler(res, data, null, encoding, req.headers, 'cats');                
//     });
// });

// app.put('/cats/:id', (req, res) => {
//     putHandler(req.params, req, (err, message) => {
//         if (err) resHandler(res, err.code, 400);
//         else resHandler(res, message);
//     });
// });

// app.post('/cats', (req, res) => {
//     postHandler(req.params, req, (err, message) => {
//         if (err) resHandler(res, err.code, 400);
//         else resHandler(res, message);
//     });
// });

// app.delete('/cats/:id', (req, res) => {
//     deleteHandler(req.params, (err, message) => {
//         if (err) resHandler(res, err, 400);
//         else resHandler(res, message);
//     });
// });

// app.get('/', (req, res) => {
//     res.sendFile('index.html', {root: '.'});
// });

module.exports = app;