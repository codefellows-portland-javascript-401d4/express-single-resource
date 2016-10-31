/** Created by Gloria Anholt on 10/31/16. **/

const path = require('path');
const ds = require('./datastore');
const express = require('express');
var app = express();


const publicDir = path.join(__dirname, '../public');
const pathname = path.join(__dirname, '..', 'city');

app.use(express.static(publicDir));


app.post('/city/:id', (req,res) => {
  let body = '';
  req.on('data', data => body += data);
  req.on('end', () => {
    var filename = req.params.id;
    if (filename.slice(-5) !== '.json') {
      filename += '.json';
    }
    console.log('the file name using query is ', filename);
    ds.write(pathname, filename, body)
      .then(() => res.send(`${filename} saved.`))
      .catch(err => console.error(err));
  });
});

app.get('/city', (req,res) => {
  ds.getAll(pathname)
    .then((cities) => {
      res.statusCode = 200;
      res.status = 'A-Ok';
      res.send(cities);
    })
    .catch(err => console.log(err));
});

app.get('/city/:id', (req, res) => {
  console.log(`Retrieving ${req.params.id} file.`);
  var filename = req.params.id;
  if (filename.slice(-5) !== '.json') {
    filename += '.json';
  }
  ds.getOne(pathname, filename)
    .then((results) => {
      res.statusCode = 200;
      res.status = 'A-Ok';
      res.send(results.toString());
    })
    .catch(err => console.error(err));
});

// app.delete('/city/:id', (req,res) => {
//   ds.deleteOne(req.params.id)
//     .then(result => res.send({result: result}))
//     .catch(err => console.error(err));
// });


module.exports = app;