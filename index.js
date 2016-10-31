const app = require('./lib/server.js');
const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log('server started on port', server.address().port);
});




// const server = require('./lib/server');

// const port = 8080;

// server.listen(port, err => {
//   if (err) console.log('ERROR', err);
//   else console.log('http server listening on port: ', port);
// });