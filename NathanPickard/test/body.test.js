const bodyParser = require('../lib/body-parser')();
const assert = require( 'chai' ).assert;

const EventEmitter = require('events');

describe('body parser test', () => {
    it('body parser', done => {
        const req = new EventEmitter();

        const next = () => {
            assert.deepEqual(req.body, { team: "titans" });
            done();
        };
        bodyParser(req, null, next);

        req.emit('data', '{ "team": "titans" }');
        req.emit('end');
    });
});