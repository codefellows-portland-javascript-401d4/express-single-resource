const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = require('chai').expect;
const assert = require('chai').assert;
const app = require('../lib/app');
// const server = require('../lib/football-server');
const port = 8080;

describe('app', () => {
    before(done => {
        app.listen(port, done);
    });
});

describe('test express server resource', () => {
    let request = chai.request(app);

    it('static index.html file', done => {
        request
            .get('/')
            .end((err, response) => {
                if(err) return done(err);
                expect(response).to.be.html;
                expect(response).to.have.status(200);
                done();
            });
    });

    it('sends back a response text', done => {
        request
            .get('/teams')
            .end((err, response) => {
                if(err) return done(err);
                assert.deepEqual(response.text, 'broncos.json ' + 'seahawks.json ');
                expect(response).to.have.status(200);
                done();
            });
    });

    it('request for resource in /teams', done => {
        request
        //   .get('/teams/seahawks')
          .get('/teams/broncos')
          .end((err, response) => {
              if(err) return done(err);
              assert.deepEqual(response.text, '{"city":"denver","conference":"afc"}');
              expect(response).to.have.status(200);
              done();
          });
    });

        it('POST request to /teams/bears', done => {
        request
          .post('/teams/bears')
          .send({"city":"chicago","conference":"nfc"})
          .end((err, response) => {
              if(err) return done(err);
              assert.deepEqual(response.text, 'data has been posted');
              expect(response).to.have.status(200);
              done();
          });
    });

    it('PUT request to teams/bears', done => {
        request
          .put('/teams/bears')
          .send({"division":"north"})
          .end((err, response) => {
              if(err) return done(err);
              assert.deepEqual(response.text, 'data now updated');
              expect(response).to.have.status(200);
              done();
          });
    });

    it('DELETE request to teams/bears, deletes the resource', done => {
        request
          .delete('/teams/bears')
          .end((err, response) => {
              if(err) return done(err);
              assert.deepEqual(response.text, 'file has been removed');
              done();
          });
    });
});
