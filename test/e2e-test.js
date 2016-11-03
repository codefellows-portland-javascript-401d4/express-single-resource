const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = require('chai').assert;
const rimraf = require('rimraf');
const app = require('../lib/app');
const path = require('path');

describe('ABV', () => {

  const testDir = path.join(__dirname, 'test-dir');
  const removeDir = done => rimraf(testDir, done);
  before(removeDir);
  after(removeDir);

  // before(() => {
  //   liquor.config(testDir);
  // });

  // pull in app.js (server) for testing
  const request = chai.request(app);

  // test case, using id:1 ... which corresponds to gin
  const gin = {
    country: 'England',
    brand: 'Tanqueray'
  };

//   it( '/GET all empty on init', done => {
//     request
// 		.get( '/liquor' )
// 		.then(res => {
//   assert.deepEqual( res.body, [] );
//   done();
// })
// 		.catch( done );
//   });

//   it('/POST', done => {
//     request
// 		.post('/liquor')
// 		.send(gin)
// 		.then(res => {
//   const id = res.body.id;
//   assert.equal(id, gin.name);
//   done();
// })
// 		.catch( done );
//
//   });

  it('/GET by id', done => {
    console.log('test get by id');
    request
		// .get(`/liquor/${gin.name}`)
    .get('/liquor/1')
		.then(res => {
  const liquor = res.body;
  assert.deepEqual(gin, '{"country":"England","brand":"Tanqueray"}');
  done();
})
		.catch( done );
  });

// it( '/GET all after post', done => {
// 	request
// 		.get( '/liquor' )
// 		.then( res => {
// 			assert.deepEqual( res.body, [ luffy ] );
// 			done();
// 		})
// 		.catch( done );
// });
//
// it( 'add another type of liquor', done => {
// 	request
// 		.post( '/liquor' )
// 		.send({ country: 'Mexico', brand: 'Herradura' })
// 		.then( res => {
// 			assert.ok( res.body.id );
// 			done();
// 		})
// 		.catch( done );
// });
});
