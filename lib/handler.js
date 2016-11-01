const sander = require('sander');
const bodyreader = require('./bodyreader');
const handler = {};


handler.getAll = (req, res) =>{
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
        .catch(err =>{
            console.error('error', err.message);
        });
        });
};

handler.getOne = (req, res) =>{
    sander.readFile('./lib/data-store/' + req.params.id + '.json')
        .then(data =>{
            res.end(data);
        })
        .catch(err =>{
            console.error('error', err.message); 
            res.statusCode = 400;
            res.end('That resource does not exist');  
        });
};


handler.post = (req,res) => {
    var id = Date.now();
    bodyreader(req, (err,data) => {
        sander.writeFile('./lib/data-store/', id + '.json', JSON.stringify(data))
            .catch(err =>{
                console.error('error', err.message); 
                res.statusCode = 400;
                res.end('That resource does not exist');
            });
    });
    res.end(id.toString());
};

handler.put = (req, res) => {
    if(req.params.id === null) {
        req.params.id = Date.now();
    }
    bodyreader(req, (err,data) => {
        sander.writeFile('./lib/data-store/', req.params.id + '.json', JSON.stringify(data))
            .catch(err => {
                console.error('error', err.message);
            });
    });
    res.end(req.params.id.toString());
};

handler.delete = (req, res) =>{
    sander.unlink('./lib/data-store/' + req.params.id + '.json')
        .catch(err => {
            console.error('error', err.message);
        });
    res.end(req.params.id.toString());
};


module.exports = handler;