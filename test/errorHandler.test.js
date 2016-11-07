const errorHandler = require('../lib/errorHandler');
const assert = require('chai').assert;
const EventEmitter = require('events');

describe( 'error handler middleware', () => {

  it( 'passes error all the way up', done => {

    const next = () => {
      done();
    };

    var res = {};
    res.status = function(thing) {
      return this;
    };
    res.send = function(thing) {
      assert.deepEqual(thing, {error: err.error});
      return thing;
    };
    var err = {};
    err.code = 2020;
    err.message = 'This is the test error';
    err.error = "Test Message";
        
    errorHandler(err, null, res, next); // eslint-disable-line no-unused-var

    done();

  });
});
