const bodyParser = require('../lib/body-parser')();
// const assert = require('chai').assert;
const eventEmitter = require('events');

describe('bodyParser middleware', () => {

  it('parses body', done => {

    const req = new eventEmitter();

    const next = () => {
      done();
    };

    bodyParser(req, null, next);

    req.emit('data', '"test data"');
    req.emit('end');
  });
});
