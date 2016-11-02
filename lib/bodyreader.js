module.exports = function createBodyReader() {
    return function bodyreader(req, res, next) {
        let body = '';

        req.on('data', data => {
            body += data;
            console.log('body', body);
        });

        req.on('end', () => {
            req.body = JSON.parse(body);
            console.log('req.body', body);
            next();
        });
    };
};