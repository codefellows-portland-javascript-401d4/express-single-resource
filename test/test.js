const getLogger = require('../lib/logger');
const assert = require('chai').assert;

describe ('logger middleware', () => {

    before (() => {
        const log = m => {message = m };
        logger = createLogger(log);
    })

    it('logs url and path', () => {
        let message;

        console.log = m => { message = m; }
        const realLog = createLogger(log);
    
        const req = {
            method: 'get',
            url: '/pirates'
        };

        let nextCall = false;
        const next = () => { nextCall = true; }

        logger(req, res, next);

        assert.equal(mesage, `${req.method} ${req.url}`);
        assert.isOk(nextCall, "next was not called");

    });
});