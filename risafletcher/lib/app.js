const express = require('express');
const app = express();
const path = require('path');
const heros = require('./routes/superRoute');
const errorHandler = require('./error-handler');

app.use('/', heros);
app.use(errorHandler);

// var id = Date.now();

// const clientDir = path.join(__dirname, '../client');
// app.use(express.static(clientDir));

// app.set('view engine', 'pug');

// app.get('/', (req,res) => {
//     console.log('reached app.get');
//    res.write('<h1>Welcome to our home page!</h1> \n');
//     sander.readdir('./lib/data-store')
//     .then(fileData => {
//         var fileArray = fileData.map((fileName) => {
//         var fileNameComplete = './lib/data-store/' + fileName;
//         return sander.readFile(fileNameComplete);
//     });
//         Promise.all(fileArray)
//         .then(data => {
//         res.end(data.join(','));
//         })
//         .catch(err =>{
//             console.error('error', err.message);
//         });
//     });
// });

// app.get('/:id', (req, res) => {
//     sander.readFile('./lib/data-store/' + req.params.id + '.json')
//     .then(data =>{
//            res.end(data);
//     })
//     .catch(err =>{
//         console.error('error', err.message); 
//         res.statusCode = 400;
//         res.end('That resource does not exist');  
//     });  
// });

// app.post('/', (req, res) => {
//     bodyreader(req, (err,data) => {
//         console.log('data', data);
//         sander.writeFile('./lib/data-store/', id + '.json', JSON.stringify(data))
//         .then(() => {
//         res.end(id.toString());
//         })
//         .catch(err => {
//             console.error('error', err.message); 
//             res.statusCode = 400;
//             res.end('That resource does not exist');
//         });
//     });
// });

// app.put('/:id', (req, res) => {
//     if(req.params.id === null) {
//         // req.params.id = Date.now();
//         res.end('ERROR, FILE DOES NOT EXIST');
//         return;
//     }
//     bodyreader(req, (err,data) => {
//         sander.writeFile('./lib/data-store/', id + '.json', JSON.stringify(data))
//         .then(() => {
//             res.end(id.toString());
//         })
//         .catch(err => {
//             console.error('error', err.message);
//         });
//     });
// });

// app.delete('/:id', (req, res) => {
//     sander.unlink('./lib/data-store/' + req.params.id + '.json')
//     .then(() => {
//         res.end(id.toString());
//     })
//     .catch(err => {
//         console.error('error', err.message);
//     });
// });

module.exports = app;