const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const addData = require('./addData');
const sander = require('sander');

//app is a function that manages the server requests and responses.  Remember functions are objects and can have methods attached to them.

const app = express();
//finds the path to the curently executed file (app.js).
const publicDir = path.join(__dirname, '../public');
const capitalsDir = path.join(__dirname, '../capitals/countryData.json');

//routes for static files

//homepage route
app.use(express.static(publicDir));

//capitals list route
app.use('/capitals', express.static(capitalsDir));

app.get('/nuke', function (req, res) {
  res.send('send a delete request to this url to nuke the world capitals.');
});

//allows users to add capitals from the home page
//sets json as the default for the body parser
app.use(bodyParser.urlencoded());
app.post('/', function(req, res){
    addData(req.body, res);
});


//allows users to add capitals as json from an api
//sets json as the default for the body parser
app.use(bodyParser.json());
app.post('/post', function(req, res){
    addData(req.body, res);
});

//allows users to delete the list of capitals 
app.delete('/nuke', function (req, res) {
    res.send('The list of coutries has been nuked, only an irradiated wasteland remains.  You monster.');
    var nuked = [{country: "The Wasteland", capital: "Mutant City"}];
    var nukedJson = JSON.stringify(nuked);
    sander.writeFile('./capitals', 'countryData.json', nukedJson)
    .then();
});


module.exports = app;
