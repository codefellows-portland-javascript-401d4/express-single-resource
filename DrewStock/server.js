const http = require('http');
const app = require('./lib/taco_express');
const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, err => {
    if(err) console.log('ERROR!', err);
    else console.log('app running on port', server.address().port);
});
