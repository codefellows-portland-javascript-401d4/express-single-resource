const chai          = require('chai');
const chaiHttp      = require('chai-http');
const assert        = chai.assert;
const bodyParser    = require('../lib/bodyParser')();
const EventEmitter  = require('events');

describe('tests out body parser middleware', () => {
    it('checks to see if JSON data is placed on request object', done => {
        let req1 = new EventEmitter();
        let next = function() {
            assert.deepEqual(JSON.parse(req1.bodyData), {data: 'testing this unit'});
            done();
        };

        bodyParser(req1, null, next);

        req1.emit('data', '{ "data": "testing this unit" }');
        req1.emit('end');
    });

    it('checks that next function has the error object in case of invalid JSON', done => {
        let req2 = new EventEmitter();
        let next = function(object) {
            assert.deepEqual(object, { code: 400, error: '<h1>Invalid JSON</h1>'});
            done();
        };

        bodyParser(req2, null, next);

        req2.emit('data', 'hi there');
        req2.emit('end');
    });
});