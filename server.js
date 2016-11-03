const app = require('./lib/app');
// const server = require('./lib/football-server');
const http = require('http');
const port = process.env.PORT || 8080;

// const store = require('./lib/data-store');
// const path = require('path');
// const storeDir = path.join(__dirname, 'teams');
// store.config(storeDir);

const server = http.createServer(app);

server.listen(port, err => {
    if(err) {
        console.log('ERROR!', err);
    } else {
        console.log('app running on port', server.address().port);
    }    
});
