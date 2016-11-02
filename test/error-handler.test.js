/** Created by Gloria Anholt on 11/1/16. **/

const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../lib/app');
const errorHandler = require('../lib/error-handler');

describe('Express server - errorHandler middleware', () => {

  const server = chai.request(app);

  it('hit the server with a bad request and gets a 404 error', done => {

    server
      .get('/api/city/las_vegas')
      .end((err, res)=> {
        if (err) {
          assert.equal(res.status, 404);
          done();
        }
      });
  });

  it('gets a 500 error when calling the error handler', done => {

    var err = {};
    var req = {};
    var res = {};
    res.status = function(code) {
      assert.equal(code, 500);
      done();
    };
    res.send = function() {
    };

    errorHandler(err, req, res, null);

  });

  it('gets a message when calling the error handler', done => {

    var err = { code: 500 };
    var req = {};
    var res = {};
    res.status = function() {};
    res.send = function(err) {
      assert.equal(err.error, 'Internal Server Error');
      done();
    };

    errorHandler(err, req, res, null);

  });

});