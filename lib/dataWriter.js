//takes the parsed data and either add it or not

function dataWriter(){
    return function (req, res, next){
        var body = [];
        req.on('data', function(chunk) {
            body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
            req.body = JSON.parse(body);
            console.log('req body is ', req.body);
            return req.body;
        });
        next();
    };
}
module.exports = dataWriter;