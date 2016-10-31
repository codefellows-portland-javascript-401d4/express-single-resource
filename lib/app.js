
const express = require('express');
const handlers = require('../handlers');
const path = require('path');

const app = express();

const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));

app.get('/', (req, res) => {
    console.log('Just Getting Started', publicDir + '/index.html');
    res.send(publicDir + '/index.html');
});

app.get('/teams', (req, res) => {
    console.log('GET ALL teams');
    handlers.getAll(req, res);
});

app.get('/teams/:id', (req, res) => {
    console.log('GET team: requested id', req.params.id);
    handlers.getSingle(req, res, req.params.id);
});

app.post('/teams', (req, res) => {
    console.log('POST: new team');
    handlers.post(req, res);
});

app.put('/teams/:id', (req, res) => {
    console.log('PUT: update existing team', req.params.id);
    handlers.put(req, res, req.params.id);
});

app.delete('/teams/:id', (req, res) => {
    console.log('DELETE team: delete a team:', req.params.id);
    handlers.remove(req, res, req.params.id);
});


app.set('view engine', 'pug');
app.get('/showteam', (req, res) => {
    res.render('dotaTeamView', {
        title: 'Team',
        message: 'find the map, find the treasure!'
    });
});



module.exports = app;
