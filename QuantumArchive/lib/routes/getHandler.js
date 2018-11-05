const sander = require('sander');
const resourceDir = './lib/models/resources/';

function getHandler(reqParamsObject, next) {
    var firstArg = reqParamsObject['0'];
    return sander
        .readdir( resourceDir )
        .then( data => {
            if ( firstArg === '' || firstArg === '/') {
                return JSON.stringify({data: data});
            } else {
                return sander
                    .readFile(`${resourceDir}${reqParamsObject['0']}.json`, {'encoding': 'utf-8'});
            };
        });
};

module.exports = getHandler;