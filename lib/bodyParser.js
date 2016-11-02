module.exports = function createBodyParser() {
    return function bodyParser(req, res, next) {
        let body = '';
        let bodyObject = {};
        req.on('data', data => {
            body += data.toString('utf-8');
        });
        req.on('end', () => {
            try {
                bodyObject = JSON.parse(body);
                req.bodyData = JSON.stringify(bodyObject);
                next();
            } catch (err) {
                next({ code: 400, error: '<h1>Invalid JSON</h1>'});
            };
        });
    };
};