'use strict';

module.exports = function bodyreader(request, callback) {
    let body = '';

    request.on('data', data => {
        body += data;
        console.log('body', body);
    });

    request.on('end', () => {
        try {
            callback(null, JSON.parse(body));
        }
        catch (error) {
            callback(error);
        }
    });
};