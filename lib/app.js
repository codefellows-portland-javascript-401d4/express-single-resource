
const express = require('express');
const handlers = require('../handlers');

const app = express();


app.use(express.static(publicDir));

app.get('/', (req, res) => {
    console.log('Just Getting Started');
    // handlers.getSingle(req, res, req.params.id);
});

app.get('/teams', (req, res) => {
    handlers.getAll(req, res);
});

app.get('/teams/:id', (req, res) => {
    console.log('requested id', req.params.id);
    handlers.getSingle(req, res, req.params.id);
});

app.post('/teams', (req, res) => {
    console.log('POST new team');
    handlers.post(req, res);
});

app.put('/teams/:id', (req, res) => {
    console.log('', );
    handlers.put(req, res, req.params.id);
});

app.delete('/teams/:id', (req, res) => {
    console.log('delete a team:', req.params.id);
    handlers.remove(req, res, req.params.id);
});

