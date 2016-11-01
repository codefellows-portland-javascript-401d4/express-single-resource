const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const server = require('../lib/app');
// const sander = require('sander');
const handler = require('../lib/handler');

const testData = {"hero": "Risa", "race": "awesome", "vehicle": "Crown Vic"};

describe('testing server.js', () =>{
    let request = chai.request(server);
    const port = 8080;

    before(done => {
        server.listen(port, done);
    });

    it('serves up an index page', done =>{
        request.get('/').end((err, res) =>{
            if (err) return done (err);
            assert.include(res.text, 'Welcome to our home page');
            done();
        });
    });

    it('GETs a single item', done => {
        request.get('/?1477949213282').end((err, res) => {
            if (err) return done (err);
            assert.include(res.text, '"hero":"Wonder Woman"');
            done();
        });
    });

    it.skip('creates data through a post', () => {
        const request = {params:{data:testData}};
        const response = {end: (hope) => {
            assert.equal(hope, request.params.id);
        }};
        handler.post(request, response);
    });
    it('creates file for POST request', () => {
        return chai.request(server)
     .post('/')
     .send(testData)
     .then(response => {
         assert.equal(response.statusCode, 200);
         assert.notEqual(response.stausCode, 400);
     })
     .catch(error => {
         console.log('Error: POST request failed');
         throw error;
     });
    });
    it('deletes file', () => {
        const request = {params:{id:1477949119174}};
        const response = {end: (hope) => {
            assert.equal(hope, request.params.id);
        }};
        handler.delete(request, response);
    });
});