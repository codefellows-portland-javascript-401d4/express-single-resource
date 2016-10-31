const http = require('http');
// const parseUrl = require('url').parse;
const fs = require('fs');
// const qs = require('querystring');
const sander = require('sander');
const bodyReader = require('./body-reader');
const express = require('express');
const app = express();

let basedir = 'data/';
let filename = 'teams.json';

//GET - home page
app.get('/', (req, res) => {
  res.send('Home Page. Go to /teams for content');
});
  
//GET - List all teams (send removed whitespace (even after body parsing) so used write/end)
app.get('/teams', (req, res) => {
  sander.readFile(basedir, filename).then(result => {
    var content = JSON.parse(result);
    for ( var i=0; i<content.length; i++ ) {
      res.write (content[i].city + ' ' + content[i].name + '\n');
    }
    res.end();
  });
});

//GET - List a specific team via teams/Cubs, for example
app.get('/teams/:team', (req, res) => {
  sander.readFile(basedir, filename).then(result => {
    var content = JSON.parse(result);
    for ( var i=0; i<content.length; i++ ) {
      if (content[i].name === req.params.team) {

        res.send(content[i].city + ' ' + content[i].name);
      }
    }
				 });
});

// POST - add a new team in JSON format via body-reader.js

app.post('/teams', (req, res) => {
  bodyReader(req, (err, team) => {
    if(err) {
      res.statusCode = 400;
      res.end(err.message);
    }
    else {
      res.statusCode = 200;
      sander.readFile(basedir, filename).then(result => {
        var content = JSON.parse(result);
        content.push(team);
        res.send(`The ${team.name} have been added.`);
        fs.writeFile(basedir + filename, JSON.stringify(content), function(err) {
          if(err) {
            return console.log(err);
          }
          console.log('Updated file has been saved');
        }); 
      });
    };
  });
});

// PUT - edit an existing team's city in JSON format via body-reader.js and via teams/Cubs, for example
app.put('/teams/:team', (req, res) => {
  bodyReader(req, (err, team) => {
    if(err) {
      res.statusCode = 400;
      res.end(err.message);
    }
    else {
      sander.readFile(basedir, filename).then(result => {
        var content = JSON.parse(result);

        for ( var i=0; i<content.length; i++ ) {
          if (content[i].name === req.params.team) {
            content.splice(i, 1, team);
            console.log(content);
          }
        }

        fs.writeFile(basedir + filename, JSON.stringify(content), function(err) {
          if(err) {
            return console.log(err);
          }
          res.statusCode = 200;
          res.send(`The ${team.name} have been edited.`);
          console.log('Updated file has been saved');
        }); 
      });
    };
  });
});

// DELETE - delete an existing team via ?team=Cubs, for example
app.delete('/teams/:team', function (req, res) {
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
    }); 
  });
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});

module.exports = app;