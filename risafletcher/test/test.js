const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const server = require('../lib/app');
const EventEmitter = require('events');
const bodyreader = require('../lib/bodyreader')();
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
            assert.include(res.text, 'Welcome to the homepage!');
            done();
        });
    });

    it('parses body', done => {
        console.log('inside body parser fxn');
        const req = new EventEmitter();
        const next = () => {
            console.log('inside next fxn');
            assert.deepEqual(req.body, {name: 'Risa'});
            done();
        };

        bodyreader(req, null, next);

        req.emit('data', '{"name": "Risa"}');
        req.emit('end');
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
        request.put('/14779809451554')
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
        request.delete('/14779809451554')
        .then(() => {
            done();
        });
    });
});