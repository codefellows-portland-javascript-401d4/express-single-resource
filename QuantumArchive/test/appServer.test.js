const chai      = require('chai');
const chaiHttp  = require('chai-http');
const assert    = chai.assert;
const server    = require('../lib/appServer');
const fs        = require('fs');
chai.use(chaiHttp);

describe('http single resource promise server', () => {
    
    let request = chai.request(server);
    const port = 8999;

    before(done => {
        server.listen({port, port}, done);
    });

    it('checks to see that we can retrieve a given cat with GET', done => {
        request
            .get('/cats/1')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    assert.deepEqual(res.body, {'id':'nyan','age':5,'color':'gray and poptart'});
                    done();
                };
            });
    });

    it('checks to see that we get text/html data for a cat when not specifying application/json in GET', done => {
        request
            .get('/cats/1')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    assert.deepEqual(res.text, '<html><head><title>Returned Data' +
                    '</title></head><body><h1>This is your requested Data<p>Cat\'s name:' +
                    ' nyan</p><p>Cat\'s age: 5</p><p>Cats\'s fur color: gray and poptart' +
                    '</p></h1></body></html>');
                    done();
                };
            });
    });

    it('checks to see that we can retrieve a given cat with GET using a promise chain', () => {
        request
            .get('/cats/1')
            .set('Content-Type', 'application/json')
            .then(data => {
                assert.deepEqual(data.body, {'id':'nyan','age':5,'color':'gray and poptart'});
            })
            .catch(err => {
                console.log(err);
            });
    });

    it('wants to see if we get a list of all resources', done => {
        request
            .get('/cats')
            .set('Content-Type','application/json')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    assert.deepEqual(res.body.data, ['0.json', '1.json', '2.json']);
                    done();
                };
            });
    });

    it('wants to see if PUT will update a given file', done => {
        request
            .put('/cats/0')
            .set('Content-Type', 'application/json')
            .send('{"id":"felix","age":8,"color":"orange"}')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    assert.equal(res.text, '<h1>put good, your resource id is 0</h1>');
                    done();
                }
            });
    });

    it('checks to see that the last file was updated during PUT operation', done => {
        request
            .get('/cats/0')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    assert.deepEqual(res.body, {'id':'felix','age':8,'color':'orange'});
                    done();
                };
            });
    });

    it('wants to see if POST works', done => {
        request
            .post('/cats')
            .set('Content-Type', 'application/json')
            .send('{"id":"carl","age":10,"color":"gray"}')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    assert.equal(res.text, '<h1>post good, your resource id is 3</h1>');
                    done();
                };
            });
    });

    it('wants to see if error will propagate if giving invalid data', done => {
        request
            .post('/cats')
            .set('Content-Type', 'application/json')
            .send('hi')
            .end((err, res) => {
                assert.equal(err.response.body.error, '<h1>Invalid JSON</h1>');
                done();
            });
    });

    it('wants to see if PUT will act like POST if file is not present', done => {
        request
            .put('/cats/8')
            .set('Content-Type', 'application/json')
            .send('{"id":"felix","age":8,"color":"orange"}')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    assert.equal(res.text, '<h1>put good, your resource id is 8</h1>');
                    done();
                }
            });
    });

    it('wants to see if DELETE will delete the last thing we PUT in', done => {
        request
            .del('/cats/8')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    assert.equal(res.text, '<h1>File was deleted</h1>');
                    done();
                }
            });
    });

    it('wants to see if DELETE works on what we POSTED', done => {
        request
            .del('/cats/3')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    assert.equal(res.text, '<h1>File was deleted</h1>');
                    done();
                }
            });
    });
   
    it('returns an error if trying to DELETE a non-existent file', done => {
        request
            .del('/cats/non-existent-cat')
            .end((err, res) => {
                assert.equal(err.response.body.error, '<h1>No such file exists</h1>');
                done();
            });
    }); 

    after(() => {
        fs.writeFile('./lib/models/resources/0.json', JSON.stringify({id:'felix',age:10,color:'black and white'}));
    });
});