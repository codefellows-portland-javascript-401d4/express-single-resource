//this modules contains the promise constructor
const fs = require('fs');

module.exports = function promise(input){
    return new Promise ((resolve, reject) =>{
        console.log('about to read file');
        fs.readFile(input, 'utf8',(err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};
