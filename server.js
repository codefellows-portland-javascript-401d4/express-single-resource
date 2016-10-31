'use strict';

const server = require('./lib/app');
const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log('server listening on port', server.address().port);
});
