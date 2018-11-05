const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = require('chai').assert;
const expect = require('chai').expect;

const app = require('../lib/app');
require('../lib/mongoose');

describe('http server functionality', () => {
  let req = chai.request(app);

  const cupertino = {name: 'cupertino'};
  const portland = {name: 'portland'};
  let stringPortland = JSON.stringify(portland);
  let stringCupertino = JSON.stringify(cupertino);
  let portlandPostId = '';


  it('POSTs successfully', done => {
    req
            .post('/cities')
            .set('Content-Type', 'application/json')
            .send(stringPortland)
            .then(res => {
              portlandPostId = JSON.parse(res.text)._id;
              assert.equal(JSON.parse(res.text).name, 'portland');
              done();
            })
            .catch(done);
  });

  it('GETs files in directory after initial POST', done => {
    req
            .get('/cities')
            .then(res => {
              expect(res).status(200);
              assert.notEqual(JSON.parse(res.text).length, 0);
              assert.include(res.text, 'portland');
              done();
            })
            .catch(done);
  });

  it('GETs a single file', done => {
    req
            .get('/cities/' + portlandPostId)
            .then(res => {
              expect(res).status(200);
              assert.equal(JSON.parse(res.text).name, 'portland');
              done();
            })
            .catch(done);
  });

  it('replaces a file using PUT', done => {
    req
            .put('/cities/' + portlandPostId)
            .set('Content-Type', 'application/json')
            .send(stringCupertino)
            .then(res => {
              expect(res).status(200);
              assert.equal(JSON.parse(res.text).name, 'cupertino');
              done();
            })
            .catch(done);
  });

  it('DELETEs a file', done => {
    req
            .del('/cities/' + portlandPostId)
            .then(res => {
              expect(res).status(200);
              assert.equal(res.text, '{"ok":1,"n":1}');
              done();
            })
            .catch(done);
  });
});
