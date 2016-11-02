
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const errorHandler = require('./error-handler');
const pug = require('pug');
const dotaTeams = require('./routes/dotaTeams');

const app = express();
const log = morgan('dev');

const publicDir = path.join(__dirname, '../public');

app.use(log);

app.use(express.static(publicDir));

console.log('use dotaTeams');
app.use('/api/teams', dotaTeams);

console.log('serve index.html');
app.get('/', (req, res) => {
    console.log('Just Getting Started', publicDir + '/index.html');
    res.send(publicDir + '/index.html');
});

app.use(errorHandler);

// app.set('view engine', 'pug');
// app.get('/showteam/:id', (req, res) => {
//     console.log('SHOW Team: render:', req.params.id);
//     handlers.renderHtml(req, res, req.params.id);
// });

module.exports = app;
