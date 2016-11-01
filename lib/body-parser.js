//before
// module.exports = function bodyReader(req, cb){
//   let body = '';
    
//   req.on('data', data => {
//     body += data;
//   });
// /*eslint-disable */
//   req.on('end', () => {
//     try {
//       cb(null, JSON.parse(body));
//     }
// 		catch (err) {
//   		cb(err);
// }
//   });
// };


//after
module.exports = function createBodyParser() {

  return function bodyParser(req, res, next) {
        
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        req.body = JSON.parse(body);
        next();
      }
      catch (err) {
  	next(err);
      }
    });
  };

};