const app = require('./lib/app');
const port = process.env.PORT || 3000;
const http = require('http');
const server = http.createServer(app);

server.listen(port, err => {
    if (err) console.log('ERROR! ', err);
    else console.log('server listening to port', port);
});

// module.exports = server;