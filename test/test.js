const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const server = require('../lib/app');
// const sander = require('sander');
const router = require('../lib/routes/superheros');

const testData = {"hero": "Risa", "race": "awesome", "vehicle": "Crown Vic"};

describe('testing server.js', () =>{
    let request = chai.request(server);
    const port = 8080;

    before(done => {
        server.listen(port, done);
    });

    it('serves up an index page', done =>{
        request.get('/superheros').end((err, res) =>{
            if (err) return done (err);
            assert.include(res.text, 'Welcome to our home page');
            done();
        });
    });

    it('GETs a single item', done => {
        request.get('/superheros/1477949180300').end((err, res) => {
            if (err) return done (err);
            assert.include(res.text, '"hero":"Flash"');
            done();
        });
    });

    it.skip('creates data through a post', () => {
        const request = {params:{data:testData}};
        const response = {end: (hope) => {
            assert.equal(hope, request.params.id);
        }};
        router.post(request, response);
    });
    it('creates file for POST request', () => {
        return chai.request(server)
     .post('/superheros')
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
        const req = {params:{id:1477949119174}};
        const response = {end: (hope) => {
            assert.equal(hope, req.params.id);
        }};
        request.delete(req, response);
    });
});