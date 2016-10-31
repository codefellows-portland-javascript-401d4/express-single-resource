const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect;
const app = require('../lib/app');
const sander = require('sander');
const boardsportsPath = (__dirname).slice(0, -5) + '/data/boardsports/';

chai.use(chaiHttp);

describe('My HTTP Server', () => {

  const request = chai.request(app);

  it('lists all the boardsports', done => {
    request
      .get('/boardsports')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.contain('snowskating');
        expect(res.text).to.contain('surfing');
        done();
      });
  });

  it('lists the contents of one file', done => {
    request
      .get('/boardsports/surfing')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.contain('surfing');
        done();
      });
  });

  it('posts POST on page', done => {

    let postObject = {name: "skateboarding", environment: "city", weather: "clear", equipment: "skateboard, shoes"};
    request
      .post('/boardsports')
      .send(postObject)
      .end((err, res) => {
        if (err) return done(err);
        request
          .get('/boardsports/skateboarding')
          .end((err, res) => {
            if (err) return done(err);
            expect(res.text).to.contain('skateboarding');
            done();
          }); 
      });  
  });

  it('writes PUT on page', done => {
    putObject = {name: "skateboarding", environment: "urban", weather: "clear", equipment: "skateboard, shoes"};
    request
      .put('/boardsports')
      .send(putObject)
      .end((err, res) => {
        if (err) return done(err);
        request
          .get('/boardsports/skateboarding')
          .end((err, res) => {
            if (err) return done(err);
            expect(res.text).to.contain('urban');
            done();
          });
      });
  });

  it('deletes a file', done => {
    request
      .delete('/boardsports/skateboarding')
      .end((err, res) => {
        if (err) return done(err); 
        request
          .get('/boardsports')
          .end((err, res) => {
            if (err) return done(err);
            expect(res.text).to.not.contain('skateboarding');
            done();
          }); 
      });
  });
});
