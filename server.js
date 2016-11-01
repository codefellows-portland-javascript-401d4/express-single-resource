'use strict';

const app = require('./lib/app');
const http = require('http');
const port = process.env.PORT || 3000;
const storageScout = require('storage-scout');
const path = require('path');

const server = http.createServer(app);

server.listen(port, () => {
    console.log('app is running on port', server.address().port);
});
