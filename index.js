const port = process.env.PORT || 3000;
const server = require('./lib/server.js'); 



server.listen(port, ()=>{
    console.log('app started on port ', server.address().port);
});
