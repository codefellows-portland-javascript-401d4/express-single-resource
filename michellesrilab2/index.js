const app = require('./lib/app');
const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer(app);
// const storageDir = path.join(__dirname, 'cities');


server.listen(port, () => {
  console.log('app running on port', server.address().port);
});
