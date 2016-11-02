const fs = require('fs');
const resourceDir = './lib/models/resources/';

function deleteHandler(reqParamsObject) {
    var reqUrl = `${resourceDir}${reqParamsObject['id']}.json`; 
    return new Promise( (resolve, reject) => {
        fs.access(reqUrl, (err) => {
            if (err) reject({ code: 404, error: '<h1>No such file exists</h1>' });
            else {
                fs.unlink(reqUrl, err => {
                    if (err) reject({code: 500, error: err});
                    else resolve('<h1>File was deleted</h1>');
                });
            };
        });
    });
};

module.exports = deleteHandler;