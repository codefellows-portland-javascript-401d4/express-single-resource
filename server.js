const app = require('./lib/app');
const http = require('http');
const port = process.env.PORT || 3000;

const store = require('bad-store');
const path = require('path');
const storeDir = path.join(__dirname, 'team');
const server = http.createServer(app);

store.config(storeDir);


server.listen(port, () => {
    console.log("app is running on port: ", server.address().port);
});

