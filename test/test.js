'use strict';

const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const path = require('path');
const storageScout = require('storage-scout');

const app = require('../lib/app');

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
            .send(testData)
            .then(response => {
                const file = response.body.id
                assert.equal(file, testData.id);
                done();
            })
            .catch(done);
        });

    it('returns a single file for GET request by id param', done => {
        request
            .get(`/herding-group/${testData.id}`)
            .then(response => {
                const breed = response.body;
                assert.deepEqual(breed, testData);
                done();
            })
            .catch(done);
        });
    });

    it.skip('creates file for POST request', () => {
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

    it.skip('removes a single file by id for DELETE request', () => {
        request.delete('/');
    });