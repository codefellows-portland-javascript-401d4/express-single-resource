


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
            console.log('body is ', body);
            var [cou, cap]= body.match(/=(\w+\+*)+/gi);
            // var[cou, cap] = newBody.split('=');
            // var morewords = body.match()
            var entry = {};
            var coun = cou.slice(1);
            var capi = cap.slice(1);
            entry.country= coun.replace(/\+/g, ' ');
            entry.capital= capi.replace(/\+/g, ' ');
            
            cb(entry, res);
        }
        else
        {
            console.log('Error, add "json" or "urlencoded" as your data format');
        }
    });
}

module.exports = myBodyParser;