const express = require('express');
const router = express.Router();
// const team = require('../team')
const bodyParser = require('../lib/bodyParser');


router
    .get('/', (req, res) => {
        store.all()
        .then (pubData => res.send(pubData))
        .catch(err => console.log(err));
    })

    .get('/:id', (req, res) => {
        store.get(req.params.id)
        .then(pubData => res.send(pubData))
        .catch(err => console.log(err));
    })

    .delete('/:id', (req, res) => {
        store.remove(req.params.id)
            .then(result => res.send({ results: result }))
            .catch(err => console.log(err));
    })

    .post('/', bodyParser, (req, res, next) => {
        store.save(res.body)
            .then(id => res.send({ id: id }))
            .catch(err => console.log(err))
    });


module.exports = router;
