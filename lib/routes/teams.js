const express = require('express');
const router = express.Router();
const fs = require('fs');
const sander = require('sander');
const bodyParserCreator = require('../body-parser');
const bodyParser = bodyParserCreator();


let basedir = './lib/models/';
let filename = 'teams.json';



router
	//GET - home page
	.get('/', (req, res, next) => {
  res.send('Home Page. Go to /teams for content');
  next();  
		  })

	// GET - List all teams
	.get('/teams', (req, res, next) => {
  sander.readFile(basedir, filename).then(result => {
    	var content = JSON.parse(result);
    for ( var i=0; i<content.length; i++ ) {
      res.write (content[i].city + ' ' + content[i].name + '\n');
    }
    	res.end();
    next();
  		});
			    	
})

//GET - List a specific team via teams/Cubs, for example
	.get('/teams/:team', (req, res, next) => {
  sander.readFile(basedir, filename).then(result => {
    var content = JSON.parse(result);
    for ( var i=0; i<content.length; i++ ) {
      if (content[i].name === req.params.team) {

        res.send(content[i].city + ' ' + content[i].name);
      }
    }
    next();
				 });
				     
})

// POST - add a new team in JSON format via body-reader.js
.post('/teams', bodyParser, (req, res, next) => {
  
  sander.readFile(basedir, filename).then(result => {
    var content = JSON.parse(result);

    content.push(req.body);
    res.send(`The ${req.body.name} have been added.`);
    fs.writeFile(basedir + filename, JSON.stringify(content), function(err) {
      if(err) {
        return console.log(err);
      }
      console.log('Updated file has been saved');
      next();
    }); 
  });
    
})
 			
// PUT - edit an existing team's city in JSON format via body-reader.js and via teams/Cubs, for example
.put('/teams/:team', bodyParser, (req, res, next) => {
  
  sander.readFile(basedir, filename).then(result => {
    var content = JSON.parse(result);

    for ( var i=0; i<content.length; i++ ) {
      if (content[i].name === req.params.team) {
        content.splice(i, 1, req.body);
        console.log(content);
      }
    }

    fs.writeFile(basedir + filename, JSON.stringify(content), function(err) {
      if(err) {
        return console.log(err);
      }
      res.statusCode = 200;
      res.send(`The ${req.body.name} have been edited.`);
      console.log('Updated file has been saved');
      next();
    }); 
  });
})

// DELETE - delete an existing team via ?team=Cubs, for example
.delete('/teams/:team', function (req, res, next) {
  res.statusCode = 200;
  sander.readFile(basedir, filename).then(result => {
    var content = JSON.parse(result);

    for ( var i=0; i<content.length; i++ ) {
      if (content[i].name === req.params.team) {
        content.splice(i, 1);
        console.log(content);
      }
    }
    res.send(`The ${req.params.team} have been deleted.`);
    fs.writeFile(basedir + filename, JSON.stringify(content), function(err) {
      if(err) {
        return console.log(err);
      }
      console.log('Updated file has been saved');
      next();
    }); 
  });
});

module.exports = router;