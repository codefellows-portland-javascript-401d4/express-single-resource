const mongoose = require('mongoose');
const City = require('./models/city');
mongoose.Promise = Promise;

const dbURI = 'mongodb://localhost/myCities';
mongoose.connect(dbURI);

mongoose.connection.on('error', (err) => {
  console.log('mongoose default connection error: ', err);
});

//create new City

const sanJose = new City({ name: 'san jose'});
sanJose.save()
  .then(savedCity => console.log(savedCity))
  .catch(err => console.log(err));


//create a new unicorn
// const lilac = new Unicorn({ name: 'lilac', horn: 'titanium' });

// lilac.save()
//     .then(savedUnicorn => console.log(savedUnicorn))
//     .catch(err => console.error(err));

// Unicorn.find()
//     .then(unicorns => console.log(unicorns));
