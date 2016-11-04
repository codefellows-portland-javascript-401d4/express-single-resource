module.exports = function createBodyParser() {

    return function bodyParser(req, res, next) {
        
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                // parse the data
                // add to req
                // call next
                let parsedBody = JSON.parse(body);
                req.body = parsedBody;
                next();
            }
            catch (err) {
                next(err);
            }
            
        });
    }

};