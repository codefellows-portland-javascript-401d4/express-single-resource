const server = require('../lib/server');
const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const port = process.env.PORT || 3000;
chai.use(chaiHttp);

describe('HTML webapp that has a persistent data store', function(){

    it('loads the webpage', function(done){
        server.listen(port, ()=>{
            console.log('app started on port ', server.address().port);
        });

        chai.request('http://localhost:3000')
        .get('/')
        .end(function (err, res) {
            expect(err).to.be.null;
            assert.ok(res);
            done();
        });
    });

    it('does not take data that already exists in the store' , function(done){
        chai.request('http://localhost:3000')
        .post('/post')
        .send({'country': 'Spain', 'capital': 'Madrid'})
        .end(function (err, res) {
            expect(err).to.be.null;
            assert.equal(res.text,'The database already contains an entry for Spain');
            done();
        });
    });

    it('lets the user add data to the store', function(done){
        chai.request('http://localhost:3000')
        .post('/post')
        .send({'country': 'Finland', 'capital': 'Helsinki'})
        .end(function (err, res) {
            expect(err).to.be.null;
            var patt = /Helsinki/g;
            assert(patt.test(res.text) === true);
            done();
        });
    });

    it('creates persistent data', function(done){
        chai.request('http://localhost:3000')
        .get('/capitals')
        .end(function (err, res) {
            expect(err).to.be.null;
            var patt = /Helsinki/g;
            assert(patt.test(res.text) === true);
            done();
        });
    });

    it('deletes data on command', function(done){
        chai.request('http://localhost:3000')
        .delete('/nuke')
        .end(function (err, res) {
            expect(err).to.be.null;
            var patt = /Helsinki/g;
            assert(patt.test(res.text) === false);
            done();
        });
    });

    it('lets you add more data after the nuke' , function(done){
        chai.request('http://localhost:3000')
        .post('/post')
        .send({'country': 'Spain', 'capital': 'Madrid'})
        .end(function (err, res) {
            var patt = /Madrid/g;
            assert(patt.test(res.text) === true);
            done();
        });
    });
});








