'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const server = require('../server');
// const sander = require('sander'); // might use this to clean up later

const testData = {'hero': 'Risa', 'race': 'awesome', 'vehicle': 'Crown Vic'};

describe('testing server.js', () => {
    let request = chai.request(server);
    const port = 8080;

    before(done => {
        server.listen(port, done);
    });

    it('serves up an index page', done => {
        request.get('/').end((err, res) => {
            if (err) return done (err);
            assert.include(res.text, 'Superheroes FTW!');
            done();
        });
    });

    it('GETs a single item', done => {
        request.get('/superheroes/1477690078444').end((err, res) => {
            if (err) return done (err);
            assert.include(res.text, '"hero":"Wonder Woman"');
            done();
        });
    });

    it('creates file for POST request', () => {
        return chai.request(server)
    .post('/superheroes')
    .send(testData)
    .then(response => {
        assert.equal(response.statusCode, 200);
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