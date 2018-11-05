module.exports = function bodyParser(req, res, next) {
    let body = '';
    
    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        try {
            let parsedBody = JSON.parse(body);
            req.body = parsedBody;
            next();
        } catch(err) {
            next(err);
        }
    });
};