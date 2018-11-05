'use strict';

const chai = require('chai');
const assert = chai.assert;
const EventEmitter = require('events');
const bodyParser = require('../lib/body-parser')();

describe('body-parser middleware', () => {
    it('parses the body', done => {
        const request = new EventEmitter();
        const next = () => {
            assert.deepEqual(request.body, { "name": "australian cattle dog" });
            done();
        };

        bodyParser(request, null, next);

        request.emit('data', '{ "name": "australian cattle dog" }');
        request.emit('end');
    });
});
