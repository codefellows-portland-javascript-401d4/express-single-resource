'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;

const server = require('../lib/app');

describe('server.js running', () => {
    const port = 3000;
    let request;

    before(done => {
        request = chai.request(server.listen(port));
        done();
    });

    it('serves up an index page', done => {
        request.get('/').end((error, response) => {
            assert.include(response.text, 'hello from express static!');
            done();
        });
    });
});
