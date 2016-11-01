const bodyParser = require('../lib/body-parser')();
const assert = require('chai').assert;
const EventEmitter = require('events');

describe('body parser', () => {
  it('parses body', done => {
    const request = new EventEmitter();

    const next = () => {
      assert.isObject(request.body);
      assert.deepEqual(request.body.test, 'this is a test');
      done();
    };

    bodyParser(request, null, next);

    request.emit('data', '{"test":"this is a test"}');
    request.emit('end');
  });
});
