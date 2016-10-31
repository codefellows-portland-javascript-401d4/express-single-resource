/** Created by Gloria Anholt on 10/31/16. **/

const path = require('path');
const ds = require('./datastore');
const express = require('express');
var app = express();


const publicDir = path.join(__dirname, '../public');
const pathname = path.join(__dirname, '..', 'city');

app.use(express.static(publicDir));


app.post('/city/:id', (req,res) => {
  console.log('Writing new file...');
  let body = '';
  req.on('data', data => body += data);
  req.on('end', () => {
    var filename = req.params.id;
    if (filename.slice(-5) !== '.json') {
      filename += '.json';
    }
    ds.write(pathname, filename, body)
      .then(() => res.send(`${filename} saved.`))
      .catch(err => console.error(err));
  });
});

app.put('/city/:id', (req,res) => {
  console.log(`Updating ${req.params.id} file.`);
  let body = '';
  req.on('data', data => body += data);
  req.on('end', () => {
    var filename = req.params.id;
    if (filename.slice(-5) !== '.json') {
      filename += '.json';
    }
    const filepath = path.join(pathname, filename);
    ds.deleteOne(filepath)
      .catch((err) => { console.log('fs delete error', err.code); })
      .then(() => { ds.write(pathname, filename, body); })
      .then(() => { res.send( `File ${filename} saved.`); })
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

app.delete('/city/:id', (req,res) => {
  console.log(`Deleting ${req.params.id} file.`);
  var filename = req.params.id;
  if (filename.slice(-5) !== '.json') {
    filename += '.json';
  }
  const filepath = path.join(pathname, filename);
  ds.deleteOne(filepath)
    .then(() => {
      res.statusCode = 200;
      res.status = 'A-Ok';
      res.send(`${filename} deleted successfully.`);
    })
    .catch(err => console.error(err));
});


module.exports = app;