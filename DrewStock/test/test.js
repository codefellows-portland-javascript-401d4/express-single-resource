const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = require('chai').assert;
const expect = require('chai').expect;
const app = require('../lib/taco_express');
const port = 5000;


describe('app', () => {

    before(done => {
        app.listen(port, done);
    });
});

describe('Test express single resource', () => {

    let request = chai.request(app);

    it('GET request to root directory, serves up static file (index.html)', done => {
        request
          .get('/')
          .end((err, response) => {
              if(err) return done(err);
              expect(response).to.be.html;
              expect(response).to.have.status(200);
              done();
          });
    });

    it('GET request to /tacos, where resources are stored - app writes response text, a list of resources in the directory', done => {
        request
          .get('/tacos')
          .end((err, response) => {
              if(err) return done(err);
              assert.deepEqual(response.text, 'carnitas.json ' + 'pollo.json ');
              expect(response).to.have.status(200);
              done();
          });
    });

    it('GET request for resource at /tacos/pollo - app writes response text, which is the contents of the resource', done => {
        request
          .get('/tacos/pollo')
          .end((err, response) => {
              if(err) return done(err);
              assert.deepEqual(response.text, '{"tortilla":"flour","filling":"chicken"}\n');
              expect(response).to.have.status(200);
              done();
          });
    });

    it('POST request to /tacos/pescado - app writes response text and creates a new resource, whose contents are the parsed body of the request', done => {
        request
          .post('/tacos/pescado')
          .send({"tortilla":"corn","filling":"fish"})
          .end((err, response) => {
              if(err) return done(err);
              assert.deepEqual(response.text, 'data has been posted');
              expect(response).to.have.status(200);
              done();
          });
    });

    it('PUT request to tacos/pescado - app writes response text and creates a new resource (if not already existing) or updates an existing resource. The updated contents of the resource are the parsed body of the request', done => {
        request
          .put('/tacos/pescado')
          .send({"tortilla":"corn","filling":"fish","salsa":"tomatillo","cheese":"cotija"})
          .end((err, response) => {
              if(err) return done(err);
              assert.deepEqual(response.text, 'data has been updated');
              expect(response).to.have.status(200);
              done();
          });
    });

    it('DELETE request to tacos/pescado - app writes response text and deletes resource', done => {
        request
          .delete('/tacos/pescado')
          .end((err, response) => {
              if(err) return done(err);
              assert.deepEqual(response.text, 'file removed');
              done();
          });
    });
});
