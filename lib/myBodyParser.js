


//parses the request body and converts the body to a JS object usable by the addData function.
function myBodyParser (req, format, cb, res){

    var body = [];
    req.on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        body = Buffer.concat(body).toString();

        if(format==='json'){
            var parsedBody = JSON.parse(body);
            cb(parsedBody, res);
        }
        else if(format==='urlencoded'){
            var arr = body.match(/=\w+/gi);
            var entry = {};
            entry.country= arr[0].slice(1);
            entry.capital= arr[1].slice(1);
            cb(entry, res);
        }
        else
        {
            console.log('Error, add "json" or "urlencoded" as your data format');
        }
    });
}

module.exports = myBodyParser;