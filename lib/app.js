const express = require('express'); // use express
const app = express(); // designate app == express
const ss = require('storage-scout');

// replaced code GET directory with this express code
// validated functionality via Postman GET
// ran trial in Postman with url == '/liquor'
// yielded array of JSON string contents of all files 1.json thru 4.json
app.get('/liquor', (req, res) => {
  ss.readAll()
    .then(liquor => res.send(liquor))
    .catch(err => console.log(err));
});

// replaced code GET file with this express code
// validated functionality via Postman GET
// ran trial in Postman with 'id' == 1 ... i.e. file 1.json
// yielded JSON string contents of file 1.json
app.get('/liquor/:id', (req, res) => {
  ss.readOne(req.params.id)
    .then(id => res.json(id))
    .catch(err => console.log(err));
});

// replaced code POST file with this express code
// validated functionality via Postman POST
// ran trial in Postman with url == '/liquor' plus data string
// yielded new file 5.json
app.post('/liquor', (req, res) => {
  let body = '';
  req.on('data', data => body += data);
  req.on('end', () => {
    ss.create(body)
    .then(data => res.send(data))
    .catch(err => console.log(err));
  });
});

// replaced code PUT file with this express code
// validated functionality via Postman PUT
// ran trial in Postman with url == '/liquor/5' plus revision to contents
// yielded file content changes in file 5.json
app.put('/liquor/:id', (req, res) => {
  let body = '';
  req.on('data', data => body += data);
  req.on('end', () => {
    ss.update(req.params.id, body)
    .then(data => res.send(data))
    .catch(err => console.log(err));
  });
});

// replaced code DELETE file with this express code
// validated functionality via Postman DELETE
// ran trial in Postman with 'id' == 4 ... i.e. file 4.json
app.delete('/liquor/:id', (req, res) => {
  ss.delete(req.params.id)
    .then(() => res.send('deleted file'))
    .catch(err => console.log(err));
});

app.get('/', (req, res) => {
  res.sendStatus('404 - Not Found');
});

module.exports = app;
