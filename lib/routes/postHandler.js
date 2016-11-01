const sander = require('sander');
const resourceDir = './lib/models/resources/';

function postHandler(reqParamsObject, req) {
    var dataId = '';
    var firstArg = reqParamsObject['0']; 
    return sander
        .readdir( resourceDir )
        .then( data => {
            return data
                .map(fileName => { return Number(fileName.split('.')[0]); })
                .sort((a,b) => { return (a - b); });
        })
        .then( array => {
            dataId = array[(array.length - 1)] + 1;
            req.params['id'] = dataId;
            return sander
                .writeFile(`${resourceDir}${dataId}.json`, req.bodyData);
        });
};

module.exports = postHandler;