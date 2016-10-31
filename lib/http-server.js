const http = require('http');
const parseUrl = require('url').parse;
const fs = require('fs');
const qs = require('querystring');
const sander = require('sander');
const bodyReader = require('./body-reader');
const express = require('express');
const app = express();

let basedir = 'data/';
let filename = 'teams.json';

// module.exports = http.createServer((req, res) => {

  // const url = parseUrl(req.url);
  // const queryData = url.parse(req.url, true).query;
  // console.log('requested resource:', req.method, url.pathname);

//home page
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

app.post('/teams', function (req, res) {
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
app.put('/teams/:team', function (req, res) {
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
          res.write(`The ${team.name} have been edited.`);
          res.end();
          console.log('Updated file has been saved');
        }); 
      });
    };
  });
});

// // DELETE - delete an existing team via ?team=Cubs, for example
//   if (req.method === 'DELETE' && queryData.team) {

//     res.statusCode = 200;
//     res.write(`The ${queryData.team} have been deleted.`);
//     sander.readFile(basedir, filename).then(result => {
//       var content = JSON.parse(result);

//       for ( var i=0; i<content.length; i++ ) {
//         if (content[i].name === queryData.team) {
//           content.splice(i, 1);
//           console.log(content);
//         }
//       }
//       res.end();
//       fs.writeFile(basedir + filename, JSON.stringify(content), function(err) {
//         if(err) {
//           return console.log(err);
//         }
//         console.log('Updated file has been saved');
//       }); 
//     });
//   };
// });

// PUT - edit an existing team's city in JSON format via body-reader.js and via teams/Cubs, for example
//   if (req.method === 'PUT' && queryData.team) {

//     bodyReader(req, (err, team) => {
//       if(err) {
//         res.statusCode = 400;
//         res.end(err.message);
//       }
//       else {
//         sander.readFile(basedir, filename).then(result => {
//           var content = JSON.parse(result);

//           for ( var i=0; i<content.length; i++ ) {
//             if (content[i].name === queryData.team) {
//               content.splice(i, 1, team);
//               console.log(content);
//             }
//           }

//           fs.writeFile(basedir + filename, JSON.stringify(content), function(err) {
//             if(err) {
//               return console.log(err);
//             }
//             res.statusCode = 200;
//             res.write(`The ${team.name} have been edited.`);
//             res.end();
//             console.log('Updated file has been saved');
//           }); 
//         });
//       };
//     });
//   }

// // DELETE - delete an existing team via ?team=Cubs, for example
//   if (req.method === 'DELETE' && queryData.team) {

//     res.statusCode = 200;
//     res.write(`The ${queryData.team} have been deleted.`);
//     sander.readFile(basedir, filename).then(result => {
//       var content = JSON.parse(result);

//       for ( var i=0; i<content.length; i++ ) {
//         if (content[i].name === queryData.team) {
//           content.splice(i, 1);
//           console.log(content);
//         }
//       }
//       res.end();
//       fs.writeFile(basedir + filename, JSON.stringify(content), function(err) {
//         if(err) {
//           return console.log(err);
//         }
//         console.log('Updated file has been saved');
//       }); 
//     });
//   };
  
// });

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});

// module.exports = http-server;