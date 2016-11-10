const jsonParser= require('./jsonParser')();
const sander = require('sander');
const path = require('path');
const dataWriter = require('./dataWriter');
const express = require('express');
const router = express.Router();

// const publicDir = path.join(__dirname, '../public');
const capitalsDir = path.join(__dirname, '../capitals/countryData.json');

module.exports = router
//finds the path to the curently executed file (app.js).

//homepage route
    // .use(express.static(publicDir))

//capitals list route
    .use('/capitals', express.static(capitalsDir)) 

//nuke route
    .get('/nuke', function (req, res) {
        res.send('send a delete request to this url to nuke the world capitals.');
    })

//allows users to add capitals as json from an Postman
    .post('/capitals', jsonParser, dataWriter)
        // promise(req)
        //  .then(saved => console.log('saved is ', saved ))
        //  .catch(next);
    



//allows users to delete the list of capitals 
    .delete('/nuke', function (req, res) {
        res.send('The list of coutries has been nuked, only an irradiated wasteland remains.  You monster.');
        var nuked = [{country: 'The Wasteland', capital: 'Mutant City'}];
        var nukedJson = JSON.stringify(nuked);
        sander.writeFile('./capitals', 'countryData.json', nukedJson);
    });





