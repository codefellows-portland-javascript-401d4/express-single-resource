const port = process.env.PORT || 3000;
const http = require('http');
const app = require('./lib/app');


const server = http.createServer(app);


server.listen(port, ()=>{
    console.log('app started on port ', server.address().port);
});
