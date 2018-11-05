'use strict';

module.exports = function bodyReader() {
    return function bodyParser(request, response, next) {
        let body = '';

        request.on('data', data => {
            body += data;
            console.log('body', body);
        });

        request.on('end', () => {
          request.body = JSON.parse(body);
          next();
        });
    };
};
