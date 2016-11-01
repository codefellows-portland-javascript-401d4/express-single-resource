module.exports = function bodyParser(req, res, next) {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        let parsedBody = JSON.parse(body);
        req.body = parsedBody;
        next();
    });
};