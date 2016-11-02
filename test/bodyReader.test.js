const bodyReader = require('../lib/bodyReader');
const assert = require('chai').assert;
const EventEmitter = require('events');

describe( 'body parser middleware', () => {

  it( 'parses body', done => {

    const req = new EventEmitter();
        
    const next = () => {
      done();
    };

    bodyReader(req, null, next);

    req.emit('data', '{ "name": "here is some data" }');
    req.emit('end');

  });
});
