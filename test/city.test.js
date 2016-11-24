const City = require('../lib/models/city');
const assert = require('chai').assert;

describe('city model', () => {

  it('validates with a name and a population', done => {
    const city = new City();
    city.name = 'cupertino';
    city.population = 1000;

    city.validate(err => {
      if(!err) done();
      else done(err);
    });
  });

  it('name is required', done => {
    const city = new City();
    city.population = 10;

    city.validate(err => {
      assert.isOk(err, 'name should be required');
      done();
    });
  });

  it('population must be a number', done => {
    const city = new City();
    city.name = 'cupertino';
    city.population = 'not a number';
    city.validate(err => { //validate is a mongoose thing that checks the schema rules
      assert.isOk(err, 'expected error on city data type');
      done();
    });
  });
});
