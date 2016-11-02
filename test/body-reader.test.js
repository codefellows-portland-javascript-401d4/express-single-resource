'use strict';

const chai = require('chai');
const assert = chai.assert;
const bodyReader = require('../lib/body-reader')();
const EventEmitter = require('events');


describe('body reader unit test', () => {



    it.only('parses the data', done => {

        const req = new EventEmitter();
        const next = () => {
            assert.deepEqual(req.body, { name: 'Superman'});
            done();
        };

        bodyReader(req, null, next);

        req.emit('data', '{ "name": "Superman" }');
        req.emit('end');

    });
});
