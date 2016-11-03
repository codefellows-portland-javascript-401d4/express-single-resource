const express = require('express');
const app = express();
const path = require('path');
const teams = require('./routes/teams');
const errorHandler = require('./error-handler');
const morgan = require('morgan');
const log = morgan('dev');
const TeamStore = require('./team-store');
const teamStore = new TeamStore;
const bodyReader = require('./body-reader');

app.use(log);

app.use('api/teams', teams);

app.use(errorHandler);

module.exports = app;

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
            })
                .catch(function(err) {
                    console.log(err);
                });
        }
    });
});

app.put('/teams/bears', (req, res) => {
    bodyReader(req, (err, data) => {
        if(err) {
            res.statusCode = 400;
            res.end(err.message);
        } else {
            teamStore.writeFile('teams/bears.json', data).then(data => {
                console.log(data);
                res.statusCode = 200;
                res.write('data now updated');
                res.end();
            })
                .catch(function(err) {
                    console.log(err);
                });
        }
    });
});

app.delete('/teams/bears', (req, res) => {
    teamStore.removeFile('teams/bears.json').then(data => {
        console.log(data);
        res.statusCode = 200;
        res.write('file has been removed');
        res.end();
    })
        .catch(function(err) {
            console.log(err);
        });
});



module.exports = app;
