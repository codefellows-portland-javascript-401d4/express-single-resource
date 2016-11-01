module.exports = function makeParser() {

    return function bodyParser( req, res, next) {
        let body = '';
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {

        });
    }
};
