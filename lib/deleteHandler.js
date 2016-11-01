const fs = require('fs');
const resourceDir = './resources/';

function deleteHandler(reqParamsObject, deleteResponse) {
    var reqUrl = `${resourceDir}${reqParamsObject['id']}.json`;
    fs.access(reqUrl, (err) => {
        if (err) {
            deleteResponse('No such file exists');
        } else {
            fs.unlink(reqUrl, err => {
                if (err) deleteResponse(err);
                else deleteResponse(null,'File was deleted');
            });
        };
    });
};

module.exports = deleteHandler;