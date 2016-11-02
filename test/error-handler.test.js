// const chai = require('chai');
// const chaiHttp = require('chai-http');
// chai.use(chaiHttp);
// const assert = chai.assert;
// // const fs = require('fs');
// const app = require('../lib/app');
// const errorHandler = require('../lib/error-handler');
//
// describe('error handling', () => {
//   const request = chai.request(app);
//
//   it('responds correctly to an invalid "GET" request', done => {
//     request
//       .get('notes/bad-file')
//       .end((err, res) => {
//         if(err) {
//           console.log(err);
//           assert.equal(err.code, err.code);
//           done();
//         } else {
//           done(err);
//         }
//       });
//   });
// });
