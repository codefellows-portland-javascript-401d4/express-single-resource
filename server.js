const app = require('./lib/server-http');
const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log('app running on port', server.address().port);
});
