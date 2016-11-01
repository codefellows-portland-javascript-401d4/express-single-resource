const index = require('./lib/index');
const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer(index);

server.listen(port, () => {
    console.log('index running on port', server.address().port);
});