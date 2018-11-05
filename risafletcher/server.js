const app = require('./lib/app');
const http = require('http');
const port = process.env.PORT || 8080;
const path = require('path');
// const clientDir = path.join(__dirname, '');


app.listen(port, () => {
    console.log('server listening on port', port) 
});