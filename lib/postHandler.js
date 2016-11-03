const sander = require('sander');
const resourceDir = './resources/';

function postHandler(reqParamsObject, req, postResponse) {
    var body = '';
    var dataId = '';
    var firstArg = reqParamsObject['0']; 
    sander
        .readdir( resourceDir )
        .then( data => {
            return data
                .map(fileName => { return Number(fileName.split('.')[0]); })
                .sort((a,b) => { return (a - b); });
        })
        .then( array => {
            req.on('data', data => {
                body += data.toString('utf-8');
            });
            req.on('end', () => {
                dataId = array[(array.length - 1)] + 1;
                sander
                    .writeFile(`${resourceDir}${dataId}.json`, body)
                    .then(data => { postResponse(null, `<h1>post good, your resource id is ${dataId}</h1>`); })
                    .catch(err => { postResponse(err); });
            });
        })
        .catch(err => { postResponse(err); });
};

module.exports = postHandler;