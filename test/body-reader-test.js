const bodyReader = require('../lib/file-store/bodyReader');
const assert = require('chai').assert;
const EventEmitter = require('events');

describe('Body reader middleware', () => {

  it('Parses request body', done => {
    let testBody = '{"something": "pirates", "thing": "sure"}';
    let req = new EventEmitter();
    let next = () => {
      console.log('request body after reader ', req.body);
      console.log('hard coded var ', JSON.parse(testBody));
      assert.deepEqual(req.body, JSON.parse(testBody));
      done();
    };

    bodyReader(req, null, next);

    req.emit('data', testBody);
    req.emit('end');

  });

});