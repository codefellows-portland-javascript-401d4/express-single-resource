'use strict';

const chai = require('chai');
const assert = chai.assert;
const EventEmitter = require('events');
const bodyParser = require('../lib/body-parser')();

describe('body-parser middleware', () => {
    it.skip('parses the body', done => {
        const request = new EventEmitter();
        const next = () => {
            // make sure body was added to request
            // technically synchronous, but call done to ensure next was called
            done();
        };

        bodyReader(request, null, next);

        request.emit('data', '{ "name": "australian cattle dog" }');
        request.emit('end');
    });
});
