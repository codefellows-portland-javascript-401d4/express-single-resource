const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = require('chai').assert;
const expect = require('chai').expect;
const routes = require('../lib/routes/citiesRoutes');
const path = require('path');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const EventEmitter = require('events');
const req = chai.request(routes);

const bodyParser = require('../lib/bodyParser');

const dushanbe = {name: 'dushanbe'};
const stringDush = JSON.stringify(dushanbe);

describe('body parser functionality', () => {
    const req = new EventEmitter();
    
    
    it('parses JSON body', () => {
        let nextCalled = false;
        const next = () => {
            nextCalled = true;
        };
        bodyParser(req, null, next);
        req.emit('data', stringDush);
        req.emit('end');
        assert.deepEqual(req.body, dushanbe);
        assert.isOk(nextCalled, 'next be called');
    });

    it('handles errors correctly', () => {
        let wasError = false;
        const next = err => {
            if(err) {
                wasError = true;
                console.log('Improperly formatted JSON');
            }
        };
        bodyParser(req, null, next);
        req.emit('data', {'name': dushanbe});
        req.emit('end');
        assert.isOk(wasError, 'there be error');
    });
});

const citiesDir = path.join(__dirname, '../cities');

describe('http server functionality', () => {

    before(() => {
        rimraf.sync(citiesDir);
        mkdirp.sync(citiesDir);
    });

    it('accesses empty file before initial POST', done => {
        req
            .get('/cities')
            .then(res => {
                assert.deepEqual(res.body, {});
                done();
            })
            .catch(done);
    });

    it('POSTs successfully', done => {
        let responseText = 'File dushanbe.txt successfully created in \'cities\' directory.';
        req
            .post('/cities')
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
            .get('/cities')
            .then(res => {
                expect(res).status(200);
                assert.equal(res.text, 'dushanbe.txt\n');
                done();
            })
            .catch(done);
    });

    it('GETs a single file', done => {
        req
            .get('/cities/dushanbe')
            .then(res => {
                expect(res).status(200);
                assert.equal(res.text, 'dushanbe');
                done();
            })
            .catch(done);
    });

    it('replaces a file using PUT', done => {
        let responseText = 'File dushanbe.txt successfully replaced.';
        req
            .put('/cities')
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
        let responseText = 'File dushanbe.txt successfully deleted.';
        req
            .del('/cities/dushanbe')
            .then(res => {
                expect(res).status(200);
                assert.equal(res.text, responseText);
                done();
            })
            .catch(done);
    });
});

// describe('error handler for routing works correctly', () => {
//     it('errors properly upon bad POST request', done => {
//         req
//             .post('/cities')
//             .set('Content-Type', 'application/json')
//             .send('{"name : dushanbe"}')
//             .then(res => {
//                 expect(res).status(500);
//                 // assert.equal(res.text, responseText);
//                 done();
//             })
//             .catch( err => {
//                 console.log('err occurred'');
//             });
//     });
// });

//cannot get error handler to work (the current code is just one of many iterations, so the issue is not with what is there now specifically - terminal returns 'Uncaught TypeError: Cannot read property 'apply' of undefined')