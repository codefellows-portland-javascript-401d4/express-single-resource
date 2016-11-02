/** Created by Gloria Anholt on 11/1/16. **/

const chai = require('chai');
const assert = require('chai').assert;
const EventEmitter = require('events');

const errorHandler = require('../lib/error-handler');


describe('Express server - errorHandler middleware', () => {

  it('accumulates gets a 500 error', done => {

    // create the dummy error -- should receive default values
    var err = {};
    var res = {};

    res.status = function(code) {
      return code;
    };

    res.send = function(err) {
      assert.equal(err.code, 500);
      done();
    };

    // call the handler with an error
    errorHandler(err, null, res, null);

  });

});