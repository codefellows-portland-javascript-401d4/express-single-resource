const express = require('express');
const router = express.Router();

const bodyParser = require('../routes/body-parser')();
const TeamStore = require('../models/team');
const teamStore = new TeamStore;


router
    .get('/', (req, res, next) => {
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
        .catch(next);
    })

    .get('/:id', (req, res, next) => {
        teamStore.getFile('teams/' + req.params.id + '.json')
            .then(data => {
                console.log(data);
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.send(data);
            })
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        teamStore.removeFile('teams/' + req.params.id + '.json')
            .then(data => {
                console.log(data);
                res.statusCode = 200;
                res.write('file has been removed');
                res.end();
            })
            .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        teamStore.writeFile('teams/' + req.params.id + '.json', JSON.stringify(req.body))
            .then(data => {
                console.log(data);
                res.statusCode = 200;
                res.write('data is posted');
                res.end();
            })
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        teamStore.writeFile('teams/' + req.params.id + '.json', JSON.stringify(req.body))
            .then(data => {
                console.log(data);
                res.statusCode = 200;
                res.write('data has been updated');
                res.end();
            })
            .catch(next);
    });

module.exports = router;

// router.get()

// module.exports = router;