const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser').json();
const Team = require('../models/team');

router
    .get('/', (req, res, next) => {
        Team.getAll()
            .then(teams => res.send(teams ))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Team.get(req.params.id)
            .then(team => res.send(team ))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Team.delete(req.params.id)
            .then(deleted => res.send(deleted ))
            .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        Team.add(req.body)
            .then(saved => res.send(saved ))
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        Team.update(req.params.id, req.body)
            .then(saved => res.send(saved ))
            .catch(next);
    });

module.exports = router;

// router.get()

// module.exports = router;