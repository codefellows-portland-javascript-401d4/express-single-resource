const errorHandler = require('./error-handler');

module.exports = function bodyreader() {

    return function bodyParser(req, res, next) {
        let body = '';

        req.on('data', data => {
            body += data;
            console.log('body', body);
        });

        req.on('end', () => {
            req.body = JSON.parse(body);
            next();
        });
    };
};