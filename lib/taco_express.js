const express = require('express');
const path = require('path');
const app = express();
const TacoStore = require('./taco_store');
const tacoStore = new TacoStore;
const bodyReader = require('./body_reader');

const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));

app.get('/tacos', (req, res) => {
    tacoStore.getList('tacos').then(data => {
        console.log(data);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.statusCode = 200;
        for (var i=0; i < data.length; i++) {
            res.write(data[i] + ' ', function(){
                res.end();
            });
        }
    })
    .catch(function(err) {
        console.log(err);
    });
});

app.get('/tacos/pollo', (req, res) => {
    tacoStore.getFile('tacos/pollo.json').then(data => {
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

app.post('/tacos/pescado', (req, res) => {
    bodyReader(req, (err, data) => {
        if(err) {
            res.statusCode = 400;
            res.end(err.message);
        }
        else {
            tacoStore.writeFile('tacos/pescado.json', data).then(data => {
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

app.put('/tacos/pescado', (req, res) => {
    bodyReader(req, (err, data) => {
        if(err) {
            res.statusCode = 400;
            res.end(err.message);
        }
        else {
            tacoStore.writeFile('tacos/pescado.json', data).then(data => {
                console.log(data);
                res.statusCode = 200;
                res.write('data has been updated');
                res.end();
            })
                .catch(function(err) {
                    console.log(err);
                });
        }
    });
});

app.delete('/tacos/pescado', (req, res) => {
    tacoStore.removeFile('tacos/pescado.json').then(data => {
        console.log(data);
        res.statusCode = 200;
        res.write('file removed');
        res.end();
    })
        .catch(function(err) {
            console.log(err);
        });
});

module.exports = app;
