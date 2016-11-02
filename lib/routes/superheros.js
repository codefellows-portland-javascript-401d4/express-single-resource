const express = require('express');
const router = express.Router();
const sander = require('sander');
const bodyreader = require('../bodyreader')();


router
        .get('/', (req,res, next) => {
            res.write('Welcome to our home page! \n');
            sander.readdir('./lib/data-store')
        .then(fileData => {
            var fileArray = fileData.map((fileName) => {
                var fileNameComplete = 'lib/data-store/' + fileName;
                return sander.readFile(fileNameComplete);
            });
            Promise.all(fileArray)
        .then(data => {
            res.end(data.join(','));
        })
        .catch(next);
        });
        })
    
        .get('/:id', (req, res, next) => {
            sander.readFile('./lib/data-store/' + req.params.id + '.json')
        .then(data =>{
            res.end(data);
        })
        .catch(next);  
        })
    

        .post('/', bodyreader, (req, res, next) => {
            var id = Date.now();
            sander.writeFile('./lib/data-store/', id + '.json', JSON.stringify(req.body))
            .then(body => {res.send(body);})
            .catch(next);
        })

    
        .put('/:id', bodyreader, (req,res, next) => {
            if(req.params.id === null) {
                req.params.id = Date.now();
            }
            sander.writeFile('./lib/data-store/', req.params.id + '.json', JSON.stringify(req.body))
            .catch(next);
            res.end(req.params.id.toString());
        })

    
        .delete('/:id', (req,res, next) => {
            sander.unlink('./lib/data-store/' + req.params.id + '.json')
        .catch(next);
            res.end(req.params.id.toString());
        });


module.exports = router;

    