'use strict';

const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const storageScout = require('storage-scout');

const app = require('../lib/app');
const EventEmitter = require('events');
const bodyReader = require('../lib/bodyReader')();

describe('storageScoutFiles api', () => {
    const request = chai.request(app);

    const testData = {
        breed: 'beauceron',
        description: 'faithful, gentle, and obedient'
    };

    it('returns empty response body for initial /GET request', done =>{
        request
            .get('/herding-group')
            .then(response => {
                assert.deepEqual(response.body, {});
                done();
            })
            .catch(done);
        });

    it('creates a file for /POST request', done => {
        request
            .post('/herding-group')
            .send(JSON.stringify(testData))
            .then(response => {
                const parse = JSON.parse(response.text);
                testData.id = parse.id
                assert.deepEqual(parse, testData);
                done();
            })
            .catch(done);
        });

    it.skip('returns a single file for GET request by id param', done => {
        request
            .get(`/herding-group/${testData.id}`)
            .then(response => {
                const parse = JSON.parse(response.text);
                assert.deepEqual(parse, testData);
                done();
            })
            .catch(done);
        });
    });

    it.skip('removes a single file by id for DELETE request', () => {
        request.delete('/');
    });