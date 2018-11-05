const bodyParser = require('../lib/body-parser')();
// const assert = require('chai').assert;
const eventEmitter = require('events');

describe('bodyParser middleware', () => {

  it('parses body', done => {

    const req1 = new eventEmitter();

    const next = () => {
      done();
    };

    bodyParser(req1, null, next);

    req1.emit('data', '"test data"');
    req1.emit('end');
  });

  it('checks bodyParser handling of empty string', done => {

    const req2 = new eventEmitter();

    const next = () => {
      done();
    };

    bodyParser(req2, null, next);

    req2.emit('data', '');
    req2.emit('end');
  });
});
