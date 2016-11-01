const app = require('./lib/app');
const http = require('http');
const port = process.env.PORT || 3000;
// const debug = require('debug')('myapp.server');

const server = http.createServer(app);
server.listen(port, () => {
	console.log('server running at', server.address());
	// debug('server running at', server.address());
});