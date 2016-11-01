
module.exports = function createBodyParser() {
    console.log('im here');
    return function bodyParser(req, res, next) {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
            console.log(body);
        });

        req.on('end', () => {
            console.log(body);
            let parsedBody = JSON.parse(body);
            req.body = parsedBody;
            // console.log(parsedBody);
            next();
        });

    };
    // bodyParser(req, res, next);
};
