const server = require('./lib/server.js');
const port = process.env.PORT || 3000;

server.listen(port, err => {
  if (err) console.log('ERROR!', err);
  else console.log('http server listening on port', port);
});