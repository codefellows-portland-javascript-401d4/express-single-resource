const index = require('./lib/index');
const http = require('http');
const port = process.env.PORT || 3000;
const path = require('path');

const server = http.createServer(index);
// const storageDir = path.join(__dirname, 'cities');


server.listen(port, () => {
    console.log('index running on port', server.address().port);
});