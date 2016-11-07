'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const app = require('../lib/app');
// const sander = require('sander');

describe('testing app.js', () =>{
    let request = chai.request(app);
    const port = 8080;

    before(done => {
        app.listen(port, done);
    });

    it('serves up an index page', done =>{
        request.get('/').end((err, res) =>{
            if (err) return done (err);
            assert.include(res.text, 'Superheroes FTW!');
            done();
        });
    });

    // it.skip('GETs a single item', done => {

    // });

    // it.skip('POSTs an item', done => {
    //     request.post().end((err, res) => {

    //     });
    // });
});