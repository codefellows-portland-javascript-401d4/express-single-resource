const myBodyParser = require('./myBodyParser');
const addData = require('./addData');
const sander = require('sander');
const path = require('path');
const express = require('express');
const router = express.Router();

const publicDir = path.join(__dirname, '../public');
const capitalsDir = path.join(__dirname, '../capitals/countryData.json');

module.exports = router
//finds the path to the curently executed file (app.js).
    // .publicDir = path.join(__dirname, '../public')
    // .capitalsDir = path.join(__dirname, '../capitals/countryData.json')

//homepage route
    .use(express.static(publicDir))

//capitals list route
    .use('/capitals', express.static(capitalsDir)) 

//nuke route
    .get('/nuke', function (req, res) {
        res.send('send a delete request to this url to nuke the world capitals.');
    })

//allows users to add capitals from the home page
    .post('/', function(req, res){
        myBodyParser(req, 'urlencoded', addData, res);
    })


//allows users to add capitals as json from an api
    .post('/post', function(req, res){
        myBodyParser(req, 'json', addData, res);
    })

//allows users to delete the list of capitals 
    .delete('/nuke', function (req, res) {
        res.send('The list of coutries has been nuked, only an irradiated wasteland remains.  You monster.');
        var nuked = [{country: "The Wasteland", capital: "Mutant City"}];
        var nukedJson = JSON.stringify(nuked);
        sander.writeFile('./capitals', 'countryData.json', nukedJson);
    });





