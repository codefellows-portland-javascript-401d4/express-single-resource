const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = require('chai').assert;
const expect = require('chai').expect;
const path = require('path');
const rimraf = require('rimraf');
// const mkdirp = require('mkdirp');
const app = require('../lib/app');

const citiesDir = path.resolve(__dirname, '../cities');

describe('http server functionality', () => {
  let req = chai.request(app);

  before(() => {
    rimraf.sync(citiesDir);
  });

  const portland = {name: 'portland'};
  let stringDush = JSON.stringify(portland);

  it('accesses empty file before initial POST', done => {
    req
            .get('/api/cities')
            .then(res => {
              assert.deepEqual(res.body, []);
              done();
            })
            .catch(done);
  });

  it('POSTs successfully', done => {
    let responseText = 'File portland.txt successfully created in \'cities\' directory.';
    req
            .post('/api/cities')
            .set('Content-Type', 'application/json')
            .send(stringDush)
            .then(res => {
              assert.equal(res.text, responseText);
              done();
            })
            .catch(done);
  });

  it('GETs all files in directory after initial POST', done => {
    req
            .get('/api/cities')
            .then(res => {
              expect(res).status(200);
              assert.equal(res.text, 'portland.txt\n');
              done();
            })
            .catch(done);
  });

  it('GETs a single file', done => {
    req
            .get('/api/cities/portland')
            .then(res => {
              expect(res).status(200);
              assert.equal(res.text, 'portland');
              done();
            })
            .catch(done);
  });

  it('replaces a file using PUT', done => {
    let responseText = 'File portland.txt successfully replaced.';
    req
            .put('/api/cities/portland')
            .set('Content-Type', 'application/json')
            .send(stringDush)
            .then(res => {
              expect(res).status(200);
              assert.equal(res.text, responseText);
              done();
            })
            .catch(done);
  });

  it('DELETEs a file', done => {
    let responseText = 'File portland.txt successfully deleted.';
    req
            .del('/api/cities/portland')
            .then(res => {
              expect(res).status(200);
              assert.equal(res.text, responseText);
              done();
            })
            .catch(done);
  });
});
