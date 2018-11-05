const express = require('express');
const router = express.Router();
// const crudHandler = require('../crudHandler.js');
const bodyparser = require('../bodyparser');
const City = require('../models/city');

module.exports = router

.get('/', (req, res, next) => {
  const query = {};
  if(req.query.name) query.name = req.query.name;

  City.find(query)
    .then(city => res.send(city))
    .catch(next);

})
.get('/numberofsanjoses', (req, res, next) => {
  City.find()
  .where('name', 'san jose')
  .exec((err, data) => {
    if(err) {
      console.log('err in mynewpath: ', err);
      next(err);
    }
    else {
      res.send(200, data.length);
    }
  });
})

.get('/:id', (req, res, next) => {
  let id = req.params.id;
  City.findById(id)
    .then(city => {
      res.send(city);
    })
    .catch(next);
})

.post('/', bodyparser, (req, res, next) => {
  new City(req.body).save()
    .then(saved => res.send(saved))
    .catch(next);
})

.put('/:id', bodyparser, (req, res, next) => {
  City.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(saved => res.send(saved))
    .catch(next);

})

.delete('/:id', (req, res, next) => {
  City.remove({ _id: req.params.id })
    .then(saved => res.send(saved))
    .catch(next);

});
