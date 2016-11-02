const express = require('express');
const app = express();
const path = require('path');
const store = require('./data-store');
// const store = require('')

const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

app.set('view engine', 'pug');

app.get('/football', (req, res) => {
    res.render('teams', {
        title: 'Football teams',
        message: 'here you will find a couple teams'
    });
});

app.get('/teams', (req, res) => {
    store.all()
        .then(pirates => res.send(pirates))
        .catch(err => console.log(err));    
});

app.get('/teams/:id', (req, res) => {
    store.get(req.params.id)
        .then(team => res.send(team))
        .catch(err => console.log(err));
});

app.delete('teams/id', (req, res) => {
    store.remove(req.params.id)
        .then(result => res.send({ result: result}))
        .catch(err => console.log(err));
});

app.post('/teams', (req, res) => {
    let body = '';
    req.on('data', data => body += data);
    req.on('end', () => {
        store.save(JSON.parse(body))
            .then(id => res.send({ id: id }))
            .catch(err => console.log(err))
    });
});

module.exports = app;
