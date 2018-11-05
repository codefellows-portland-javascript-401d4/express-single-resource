const express           = require('express');
const router            = express.Router();
const bodyParserFunc    = require('../bodyParser');
const bodyParser        = bodyParserFunc();
const getHandler        = require('./getHandler');
const postHandler       = require('./postHandler');
const deleteHandler     = require('./deleteHandler');
const putHandler        = require('./putHandler');

router
    .get('/*', (req, res, next) => {
        getHandler(req.params, next)
            .then(data => {
                if (!req.headers['content-type']) {
                    res.render('cats', JSON.parse(data));
                } else if (req.headers['content-type'] !== 'application/json') {
                    res.render('cats', JSON.parse(data));
                } else {
                    res.send(JSON.parse(data));
                };
            })
            .catch(err => { next({code: 400, error: 'bad request'}); });
    })

    .put('/:id', bodyParser, (req, res, next) => {
        putHandler(req.params, req)
            .then(data => res.send(`<h1>put good, your resource id is ${req.params['id']}</h1>`))
            .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        postHandler(req.params, req)
            .then(data => res.send(`<h1>post good, your resource id is ${req.params['id']}</h1>`))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        deleteHandler(req.params)
            .then(data => res.send(data))
            .catch(next);
    })

    .get('/', (req, res) => {
        res.sendFile('index.html', {root: '.'});
    });

module.exports = router;