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

const bodyParser = require('../lib/bodyParser');

describe('body parser functionality', () => {
    it('parses JSON body', () => {
        const req = new EventEmitter();
        let dushanbe = {name: 'dushanbe'};
        let stringDush = JSON.stringify(dushanbe);
        let nextCalled = false;
        const next = () => {
            nextCalled = true;
        };
        bodyParser(req, null, next);
        req.emit('data', `${stringDush}`);
        req.emit('end');
        assert.deepEqual(req.body, dushanbe);
        assert.isOk(nextCalled, 'next be called');
    });
});

const citiesDir = path.join(__dirname, '../cities');
console.log('dirname: ', __dirname);
console.log('citiesDir: ', citiesDir);

describe('http server functionality', () => {
    let req = chai.request(routes);

    before(() => {
        rimraf.sync(citiesDir);
        mkdirp.sync(citiesDir);
    });

    let dushanbe = {name: 'dushanbe'};
    let stringDush = JSON.stringify(dushanbe);

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
            .send(`${stringDush}`)
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
            .send(`${stringDush}`)
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