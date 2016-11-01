const bodyParser = require( '../lib/body_parser' )();
const assert = require( 'chai' ).assert;
const EventEmitter = require('events');

describe('body parser middleware', () => {

    it('parses body', done => {

        const req = new EventEmitter();

        const next = () => {
            assert.deepEqual(req.body, { name: "here is some data" });
            done();
        };

        bodyParser(req, null, next);

        req.emit('data', '{ "name": "here is some data" }');
        req.emit('end');

    });
});
