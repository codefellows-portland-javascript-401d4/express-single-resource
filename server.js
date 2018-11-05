/*** Created by Gloria Anholt on 10/27/16. ***/

const http = require('http');
const app = require('./lib/app');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, err => {
  if (err) {
    console.error('Server error: ', err);
  } else {
    console.log('App running on port ', port);
  }
});