
//parses the request body and converts the body to a JS object usable by the addData function.
function jsonParser(){
    return function (req, res, next){
        var body = [];
        req.on('data', function(chunk) {
            body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
            req.body = JSON.parse(body);
        });
        next();
    };
}
module.exports = jsonParser;


