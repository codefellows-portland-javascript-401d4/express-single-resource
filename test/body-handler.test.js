/** Created by Gloria Anholt on 11/1/16. **/

const chai = require('chai');
const assert = require('chai').assert;
const EventEmitter = require('events');

const bodyParser = require('../lib/body-handler');


describe('Express server - bodyParsing middleware', () => {


  it('accumulates and parses the body of dummy request', done => {

    // create the dummy emitter and give it an id
    var req = new EventEmitter();
    req.params = {id: 'test.json'};

    function next() {
      assert.equal(req.body, '{"City": "Portland"}');
      assert.equal(req.params.id, req.filename);
      done();
    }

    // call the handler so it subscribes to events
    bodyParser(req, null, next);
    // emit data to check in the test
    req.emit('data', '{"City": "Portland"}' );
    req.emit('end');

  });

});