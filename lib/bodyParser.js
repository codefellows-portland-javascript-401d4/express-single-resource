module.exports = function makeParser() {

    return function bodyParser( req, res, next) {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => { 
            if (req.is('json') || req.is('application/json')) {
                req.body = JSON.parse(body);
                next();
            } else {
                req.body = body;
                console.log("No JSON header sent, data is not parsed");
                next();
            }
        });
    }
};
