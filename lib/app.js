const express = require('express');
const app = express();
const handler = require('./handler');
// const path = require('path');

// const publicDir = path.join(__dirname, '../public');
// app.use(express.static(publicDir));

// app.set('view engine', 'pug');


app.get('/', (req,res) => {
    handler.getAll(req, res);
});
    
app.get('/:id', (req, res) => {
    handler.getOne(req, res);   
});
   
app.post('/', (req, res) => {
    handler.post(req, res);
});
    
app.put('/:id', (req,res) => {
    handler.put(req,res);
});
    
app.delete('/:id', (req,res) => {
    handler.delete(req, res);
});
    
module.exports = app;