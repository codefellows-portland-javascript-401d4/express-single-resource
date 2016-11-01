const fs = require('fs');
const resourceDir = './resources/';

function deleteHandler(reqParamsObject, deleteResponse) {
    var reqUrl = `${resourceDir}${reqParamsObject['id']}.json`;
    fs.access(reqUrl, (err) => {
        if (err) {
            deleteResponse('<h1>No such file exists</h1>');
        } else {
            fs.unlink(reqUrl, err => {
                if (err) deleteResponse(err);
                else deleteResponse(null,'<h1>File was deleted</h1>');
            });
        };
    });
};

module.exports = deleteHandler;