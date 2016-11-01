const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const path = require('path');
const server = require('../lib/app');
const sander = require('sander');

const testData = {"hero": "Risa", "race": "awesome", "vehicle": "Crown Vic"};

describe('testing server.js', () =>{
    const port = 8080;
    let request;

    before(done => {
        request = chai.request(server.listen(port));
        done();
    });

    it('serves up an index page', done =>{
        request.get('/').end((err, res) =>{
            if (err) return done (err);
            assert.include(res.text, 'Welcome to our home page');
            done();
        });
    });

    it('GETs a single item', done => {
        request.get('/?1477695490435').end((err, res) => {
            if (err) return done (err);
            assert.include(res.text, '"hero":"Wonder Woman"');
            done();
        });
    });

    it('creates file for POST request', done => {
     request.post('/')
     .send(testData)
     .then(response => {
         assert.equal(response.statusCode, 200);
         assert.notEqual(response.stausCode, 400);
         done();
     })
     .catch(error => {
         console.log('Error: POST request failed');
         throw error;
     });
    });

    it('PUT request', done => {
    request.put('/1477689961463')
     .send(testData)
     .then(response => {
         assert.equal(response.statusCode, 200);
         assert.notEqual(response.stausCode, 400);
         done();
     })
     .catch(error => {
         console.log('Error: PUT request failed');
         throw error;
     });
    });

    it('deletes file', done => {
        request.delete('/1477981402993')
        .then(() => {
            done();
        });
    });
});