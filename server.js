const http = require('http');
const app = require('./lib/app');
const port = process.env.PORT || 3000;


const server = http.createServer(app);

server.listen(port, () => {
  console.log('Server started on port:', server.address().port);
});