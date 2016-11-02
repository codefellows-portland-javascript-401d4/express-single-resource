const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const assert = chai.assert;
const fileStore = require('../lib/models/dotaTeam');
chai.use(chaiHttp);

describe('Our server responds to requests', done => {

    let locHost = 'http://localhost:3000';
    let testTeam1 = {"teamName":"Natus Vincere","teamMembers":["Ditya Ra","Dendi","GeneRaL","SoNNeikO","Artstyle"],"region":"EU","tiWinner":true,"id":1};

    before(done => {
        rimraf('./lib/dotaTeams/*', err => {
            if (err) throw err;
            done();
        });
    });

    before(done => {
        mkdirp('./lib/dotaTeams', (err) => {
            if (err) throw err;
            done();
        });        
    });

    it('Should make a file from a POST request', () => {
        return chai.request(locHost)
        .post('/api/teams')
        .send(testTeam1)
        .then(res => {
            assert.equal(res.statusCode, 201);
            assert.deepEqual(res.body, testTeam1);
        })
        .catch(err => {
            console.log('POST test err');
            throw err;
        });
    });

    it('Should retrieve a single file from a GET request', () => {
        return chai.request(locHost)
        .get('/api/teams/1')
        .then(res => {
            assert.deepEqual(res.body, testTeam1);
        })
        .catch(err => {
            console.log('GET test err');
            throw err;
        });
    });

    it('Should retrieve all files from GET request to /teams', () => {
        return chai.request(locHost)
        .get('/api/teams')
        .then(res => {
            assert.isArray(res.body);
        })
        .catch(err => {
            console.log('GET all test err');
            throw err;
        });
    });

    it('Should update a file from a PUT request', () => {
        return chai.request(locHost)
        .put('/api/teams/1')
        .send({"teamName": "Navi"})
        .then(res => {
            assert.deepEqual(res.body, {"teamName":"Navi"});
        })
        .catch(err => {
            console.log('PUT test err');
            throw err;
        });
    });

    it('Should delete a file from a DELETE request', () => {
        return chai.request(locHost)
        .del('/api/teams/1')
        .then(res => {
            assert.equal(res.statusCode, 200);
            return fileStore.readDir('./lib/dotaTeams');
        })
        .then(arr => {
            assert.equal(arr.length, 0);
        })
        .catch(err => {
            console.log('Error Testing DELETE', err);
            throw err;
        });
    });

});