//This module adds user data to the store when the submit is clicked.
const promise = require('./promise');
const sander = require( 'sander' );
const display = require('./display');

function addData(entry, response){
    console.log('entry is', entry );
    promise('./capitals/countryData.json')
        .then(function(data) {
            var parsedData = JSON.parse(data);
            console.log(parsedData);
            var filtered = parsedData.filter(function(each){
                return each.country == entry.country;
            });
            console.log('filtered is ', filtered);
            console.log('entry country is ', entry.country);
            if (filtered.length > 0){
                response.write(`The database already contains an entry for ${entry.country}`); 
                response.end();
            } 
            else{
                parsedData.push(entry);
                var jsonArray = JSON.stringify(parsedData);
                sander.writeFile('./capitals', 'countryData.json', jsonArray);
                display(response);

            }
        })
        .catch(function(err){
            console.log('caught error is ', err);
        });
}  


module.exports = addData;