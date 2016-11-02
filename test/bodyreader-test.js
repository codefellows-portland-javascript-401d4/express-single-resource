const bodyreader = require('../lib/bodyreader')();
const chai = require('chai');
const assert = chai.assert;
const EventEmitter = require('events');

describe ('bodyreader middleware', () => {

    it('parses body', done =>{
        const req = new EventEmitter();
        const next = () => {
            assert.deepEqual(req.body, { name: 'Flash'});
            done();
        };
        bodyreader(req, null, next);

        req.emit('data', '{"name": "Flash"}');
        req.emit('end');
    });
});