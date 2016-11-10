const promise = require('./promise');
const sander = require( 'sander' );


//This module adds user data to the store when the submit is clicked.

function dataWriter(req, res, next){
  
    promise('./capitals/countryData.json')
        .then(function(data) {
            var parsedData = JSON.parse(data);
            var filtered = parsedData.filter(function(each){
                return each.country == req.body.country;
            });
            if (filtered.length > 0){
                res.write(`The database already contains an entry for ${req.body.country}`); 
                res.end();
              
            } 
            else{
                parsedData.push(req.body);
                var jsonArray = JSON.stringify(parsedData);
                sander.writeFile('./capitals', 'countryData.json', jsonArray);
                res.write(req.body.capital +', '+ req.body.country);
                res.end();
            }
        })
        .catch(next);
    
}  

module.exports = dataWriter;