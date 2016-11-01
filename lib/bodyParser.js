module.exports = function createBodyParser() {
    return function bodyParser(req, res, next) {
        let body = '';
        let bodyObject = {};
        req.on('data', data => {
            body += data.toString('utf-8');
        });
        req.on('end', () => {
            bodyObject = JSON.parse(body);
            if (typeof(bodyObject) !== 'object') next('bad request'); 
            else {
                req.bodyData = JSON.stringify(bodyObject);
                next();
            };
        });
    };
};