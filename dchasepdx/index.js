const app = require('./lib/app.js');
const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log('server started on port', server.address().port);
});

