const express = require('express');
const router = express.Router();
const bodyReader = require('../bodyReader')();
const DotaTeam = require('../models/dotaTeam');

router 
    .get('/', (req, res, next) => {
        console.log('router GET all');
        DotaTeam.getAll()
        .then(teams => {
            res.writeHead(200, {'Content-type': 'application/json'});
            console.log('ready to write all teams', teams);
            res.write(JSON.stringify(teams));
            res.end();
        })
        .catch(next);
    })

    .get('/:id', (req, res, next) => {
        console.log('router GET one');
        DotaTeam.getOne(req.params.id)
        .then(team => {
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.write(team);
            res.end();
        })
        .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        console.log('router DELETE');
        DotaTeam.remove(req.params.id)
        .then( () => {
            res.writeHead(200, {'Content-type': 'application/json'}); 
            res.write(JSON.stringify('Deleted: ' + req.params.id));
            res.end();
        })
        .catch(next);
    })

    .post('/', bodyReader, (req, res, next) => {
        console.log('router POST');
        DotaTeam.add(req.body)
        .then(saved => {
            res.writeHead(201, {'Content-type': 'application/json'}); 
            res.write(saved);
            res.end();
        })
        .catch(next);
    })

    .put('/:id', bodyReader, (req, res, next) => {
        console.log('router PUT');
        DotaTeam.updateFile(req.params.id, req.body)
        .then(saved => {
            console.log(saved);
            res.writeHead(200, {'Content-type': 'application/json'}); 
            res.write(saved);
            res.end();
        })
        .catch(next);
    });

module.exports = router;


// app.post('/teams', (req, res) => {
//     console.log('POST: new team');
//     handlers.post(req, res);
// });

// app.put('/teams/:id', (req, res) => {
//     console.log('PUT: update existing team', req.params.id);
//     handlers.put(req, res, req.params.id);
// });

// app.delete('/teams/:id', (req, res) => {
//     console.log('DELETE team: delete a team:', req.params.id);
//     handlers.remove(req, res, req.params.id);
// });


