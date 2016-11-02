/** Created by Gloria Anholt on 11/1/16. **/

const express = require('express');
const router = express.Router();
const path = require('path');
const ds = require('../datastore');
const bodyParser = require('../bodyHandler');
const pathname = path.join(__dirname, '..', 'city');

router
  .post('/city/:id', bodyParser, (req, res, next) => {
    console.log('Writing new file...');
    ds.write(pathname, req.filename, req.body)
      .then(() => res.send(`${req.filename} saved.`))
      .catch(next);
  })
  .put('/city/:id', bodyParser, (req, res, next) => {
    console.log(`Updating ${req.params.id} file.`);
    const filepath = path.join(pathname, req.filename);
    ds.deleteOne(filepath)
      .then(() => { ds.write(pathname, req.filename, req.body); })
      .then(() => { res.send( `File ${req.filename} saved.`); })
      .catch(next);
  })
  .get('/city', (req, res, next) => {
    ds.getAll(pathname)
      .then((cities) => {
        res.statusCode = 200;
        res.status = 'A-Ok';
        res.send(cities);
      })
      .catch(next);
  })
  .get('/city/:id', (req, res, next) => {
    console.log(`Retrieving ${req.params.id} file.`);
    var filename = req.params.id;
    if (filename.slice(-5) !== '.json') {
      filename += '.json';
    }
    ds.getOne(pathname, filename)
      .then((results) => {
        res.statusCode = 200;
        res.status = 'A-Ok';
        res.render('cities', JSON.parse(results));
      })
      .catch(next);
  })
  .delete('/city/:id', (req, res, next) => {
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
      .catch(next);
  });


module.exports = router;

