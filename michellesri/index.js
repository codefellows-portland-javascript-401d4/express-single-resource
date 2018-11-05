const app = require('./lib/app');
// const http = require('http');
const port = process.env.PORT || 3000;
require('./lib/mongoose');

// const server = http.createServer(app);
// const storageDir = path.join(__dirname, 'cities');


app.listen(port, () => {
  console.log('app running on port: ', port);
});
