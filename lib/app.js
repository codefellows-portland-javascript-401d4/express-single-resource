const express = require('express');
const app = express();
const path = require('path');
const TeamStore = require('./team-store');
const teamStore = new TeamStore;
const bodyReader = require('./body-reader');

const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

// app.set('view engine', 'pug');

// app.get('/football', (req, res) => {
//     res.render('teams', {
//         title: 'Football teams',
//         message: 'here you will find a couple teams'
//     });
// });

app.get('/teams', (req, res) => {
    teamStore.getList('teams')
        .then(data => {
            console.log(data);
            res.setHeader('Content-Type', 'text/html; charset=uft-8');
            res.statusCode = 200;
            for (var i = 0; i < data.length; i++) {
                res.write(data[i] + ' ', function() {
                    res.end();
                });
            }    
    })
    .catch(function(err) {
        console.log(err);
    });
});

app.get('/teams/broncos', (req, res) => {
    teamStore.getFile('teams/broncos.json').then(data => {
        console.log(data);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.write(data);
        res.end();
    })
        .catch(function(err) {
            console.log(err);
        });
});

app.post('/teams/bears', (req, res) => {
    bodyReader(req, (err, data) => {
        if(err) {
            res.statusCode = 400;
            res.end(err.message);
        } else {
            teamStore.writeFile('teams/bears.json', data).then(data => {
                console.log(data);
                res.statusCode = 200;
                res.write('data has been posted');
                res.end();
            });
        }
    });
});

app.delete('teams/id', (req, res) => {
    store.remove(req.params.id)
        .then(result => res.send({ result: result}))
        .catch(err => console.log(err));
});



module.exports = app;
