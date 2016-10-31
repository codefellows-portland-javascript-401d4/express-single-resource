const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const sander = require('sander');
const app = require('../lib/app');


describe('Express http server API', () => {

  const server = chai.request(app);

  before(done => {
    // if the portland file is still around, remove it. ditch the error if it's not around.
    sander.unlink('/home/driel/projects/CodeFellows401/lab_assignments/class11-express-single-resource/city/portland.json')
      .then(done)
      .catch((err) => {
        console.error('You got a fs error ', err.code);
        done();
      });
  });


  it('hits the root and gets a 200 Ok', done => {
    server
      .get('/')
      .end((err, res)=> {
        if (err) return done(err);
        assert.equal(res.status, 200);
        done();
      });
  });

  it('retrieves all files in the city folder by name', done => {

    const testHtml = '<h2>The data store contains the following files: </h2><ul>\n\n' +
      '<li>boston.json</li>' +
      '<li>los_angeles.json</li>' +
      '<li>miami.json</li>' +
      '<li>new_york.json</li>' +
      '<li>san_francisco.json</li>' +
      '</ul>' +
      'To retrieve a file, please query the file name';

    server
      .get('/city')
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, testHtml);
        done();
      });
  });

  it('retrieves the contents of a file', done => {

    const expectedResults = '{"City":"Boston","State":"MA","Mean_1_Bdrm_Price":"$2025"}\n';

    server
      .get('/city/boston')
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, expectedResults);
        done();
      });
  });


  it('writes post data to a file', done => {

    const expectedResults = 'san_diego.json saved.';

    server
      .post('/city/san_diego')
      .send({"City":"San Diego","State":"CA","Median_1_BR_price":"$1,500","Median_2_BR_price":"$2,100"})
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, expectedResults);
        done();
      });
  });

  it('retrieves all files in the city folder by name', done => {

    const testHtml = '<h2>The data store contains the following files: </h2><ul>\n\n' +
      '<li>boston.json</li>' +
      '<li>los_angeles.json</li>' +
      '<li>miami.json</li>' +
      '<li>new_york.json</li>' +
      '<li>san_diego.json</li>' +
      '<li>san_francisco.json</li>' +
      '</ul>' +
      'To retrieve a file, please query the file name';

    server
      .get('/city')
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, testHtml);
        done();
      });
  });

  it('retrieves the contents of a file added using POST method', done => {

    const expectedResults = '{"City":"San Diego","State":"CA","Median_1_BR_price":"$1,500","Median_2_BR_price":"$2,100"}';

    server
      .get('/city/san_diego.json')
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, expectedResults);
        done();
      });
  });

  it('deletes the san_diego.json file', done => {

    const expectedResults = 'san_diego.json deleted successfully.';

    server
      .del('/city/san_diego')
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, expectedResults);
        done();
      });
  });


  it('writes a file using the PUT method', done => {

    const expectedResults = 'File portland.json saved.';

    server
      .put('/city/portland')
      .send({"City":"Portland","State":"OR","Median_1_BR_price":"$1,000","Median_2_BR_price":"$2,000"})
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, expectedResults);
        done();
      });
  });

  it('retrieves all files in the city folder by name', done => {

    const testHtml = '<h2>The data store contains the following files: </h2><ul>\n\n' +
      '<li>boston.json</li>' +
      '<li>los_angeles.json</li>' +
      '<li>miami.json</li>' +
      '<li>new_york.json</li>' +
      '<li>portland.json</li>' +
      '<li>san_francisco.json</li>' +
      '</ul>' +
      'To retrieve a file, please query the file name';

    server
      .get('/city')
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, testHtml);
        done();
      });
  });


});

