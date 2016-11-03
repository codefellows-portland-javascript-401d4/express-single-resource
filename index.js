const app = require('./lib/appServer');
const http = require('http');
const port = process.env.PORT || 8999;

const server = http.createServer(app);

server.listen(port, err => {
    if (err) console.log('ERROR! ', err);
    else console.log('server listening to port', port);
});