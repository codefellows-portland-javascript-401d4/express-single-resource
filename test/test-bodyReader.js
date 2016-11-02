const bodyReader = require('../lib/bodyReader')();
const assert = require( 'chai' ).assert;
const EventEmitter = require('events');

describe( 'body reader middleware', () => {

	it( 'parses body', done => {

        const req = new EventEmitter();
        
        const next = () => {
            // test that body was added to req
            assert.deepEqual(req.body, { "name": "here is some data" });
            // even though technically sync,
            // call done so we know that next was called
            done();
        };

        bodyReader(req, null, next);

        req.emit('data', '{ "name": "here is some data" }');
        req.emit('end');

    });
});