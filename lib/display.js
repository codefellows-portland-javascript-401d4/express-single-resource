//this modules is resplonsible for displaying the data on the webpage
//it calls promises and appends that data to the page.
const fs = require('fs');
const promise = require('./promise');

//this function displays the homepage.
var display = function(response){
    fs.readFile('./public/index.html', function (err, html) {
        if (err) {
            console.log('error is ', err); 
        }   
        else
        response.write(html); 
        promise('./capitals/countryData.json')
                .then(function(data) {  
                    response.write('<h3> Country : Capital</h3>');
                    var parsedData = JSON.parse(data);
                    parsedData.forEach(function(entry){
                        response.write('<p>' + entry.country + ' : ' + entry.capital + '</p>');
                    });
                    response.end();
                })
                .catch(function(err){
                    console.log('caught error is ', err);
                }); 
    });
};




module.exports = display; 
