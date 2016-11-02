'use strict';

module.exports = function errorHandler(err, req, res, next) {
    const code = error.code || 500;
    const error = code === 500 ? 'Internal Server Error' : error.error;
    console.error(err.error || err.message);
        res.status(code).send({ error });
};
