const express = require('express');
const app = express();
const path = require('path');
const fileStore = require('./file-store/fileStore');

const pubDir = path.join(__dirname, '../public');
app.use(express.static(pubDir));

app.set('view engine', 'pug');

app.get('/teams', (req, res) => {
  fileStore.readDir(fileStore.path)
    .then(idArr => {
      return fileStore.getAll(idArr);
    })
    .then(allFiles => {
      res.send(allFiles);
    })
    .catch(err => console.log('get all error: ', err));
});

app.get('/teams/:id', (req, res) => {
  fileStore.getFile(req.params.id)
    .then(file => {
      //Not sure why I had to manually set the res type? Otherwise response type was text/plain
      res.header({'Content-Type': 'application/JSON'});
      res.send(file);
    })
    .catch(err => console.log('get single error: ', err));
});

app.post('/teams', (req, res) => {
  let body = '';
  req.on('data', data => body += data);
  req.on('end', () => {
    fileStore.createFile(body)
      .then(newFile => {
        res.header({'Content-Type': 'application/JSON'});
        res.send(newFile);
      })
      .catch(err => console.log(err));
  });

});

app.put('/teams/:id', (req, res) => {
  let body = '';
  req.on('data', data => body += data);
  req.on('end', () => {
    fileStore.readDir(fileStore.path)
      .then(idArr => {
        if (idArr.indexOf(req.params.id) === -1) {
          res.header(404, {'Content-Type': 'text/plain'});
          res.send('Resource does not exist!'); 
        } else {
          fileStore.updateFile(body, req.params.id)
            .then(file => {
              res.header({'Content-Type': 'application/JSON'});
              res.send(file);
            })
            .catch(err => console.log(err));
        }
      });
  });
});

app.delete('/teams/:id', (req, res) => {
  fileStore.destroy(req.params.id)
    .then(file => {
      res.send('Resource deleted.');
    })
    .catch(err => console.log('get single error: ', err));
});


module.exports = app;