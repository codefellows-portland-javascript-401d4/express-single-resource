const chai          = require('chai');
const chaiHttp      = require('chai-http');
const assert        = chai.assert;
const errorHandler  = require('../lib/errorHandler');

describe('unit tests errorHandler module', () => {
    
    const errStatus1 = {
        code: 400,
        error: 'bad request',
        message: 'bad request'
    };
    const errStatus2 = {
        key: null
    };
    
    it('handles errors and sets response', done => {
        let res = {
            error : null,
            status : function(code) { 
                this.error = code;
                return this;
            },
            send : function(object) {
                assert.equal(this.error, 400);
                assert.deepEqual(object, {error: 'bad request'});
                done();
            }
        };

        errorHandler(errStatus1, null, res, null);
    });

    it('gives default handler error message in case err message doesn\'t contain proper fields', done => {
        let res2 = {
            error : null,
            status: function(code) {
                this.error = code;
                return this;
            },
            send : function(object) {
                assert.equal(this.error, 500);
                assert.deepEqual(object, {error: 'Internal Server Error'});
                done();
            }
        };

        errorHandler(errStatus2, null, res2, null);
    });
});