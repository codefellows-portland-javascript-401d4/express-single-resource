const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('../body_parser')();
const TacoStore = require('../taco_store');
const tacoStore = new TacoStore;

router
    .get('/', (req, res, next) => {
        tacoStore.getList('tacos')
        .then(data => {
            console.log(data);
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.statusCode = 200;
            for (var i=0; i < data.length; i++) {
                res.write(data[i] + ' ', function(){
                    res.end();
                });
            }
        })
        .catch(next);
    })

    .get('/:id', (req, res, next) => {
        tacoStore.getFile('tacos/' + req.params.id + '.json')
        .then(data => {
            console.log(data);
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.send(data);
        })
        .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        tacoStore.removeFile('tacos/' + req.params.id + '.json')
        .then(data => {
            console.log(data);
            res.statusCode = 200;
            res.write('file removed');
            res.end();
        })
        .catch(next);
    })

    .post('/:id', bodyParser, (req, res, next) => {
        console.log('in here');
        const tacosDir = path.join(__dirname, '../../tacos/' + req.params.id + '.json');
        tacoStore.writeFile(tacosDir, req.body)
        .then(data => {
            console.log(data);
            res.statusCode = 200;
            res.write('data has been posted');
            res.end();
        })
        .catch(next);
    });



module.exports = router;
