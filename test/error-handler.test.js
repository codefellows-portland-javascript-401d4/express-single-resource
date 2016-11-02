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

  it('hit the server with a bad route and gets a 400 error', done => {

    var err = {};
    var req = {};
    var res = {};
    res.status = function(code) {
      assert.equal(code, 500);
      done();
    };
    res.send = function(err) {
    };

    errorHandler(err, req, res, null);

  });

});