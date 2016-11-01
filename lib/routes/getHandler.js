const sander = require('sander');
const resourceDir = './lib/models/resources/';

function getHandler(reqParamsObject) {
    var firstArg = reqParamsObject['0'];
    return sander
        .readdir( resourceDir )
        .then( data => {
            if ( firstArg === '' || firstArg === '/') {
                return JSON.stringify({data: data}); //getResponse(null, JSON.stringify({data: data}), 'application/json');
            } else {
                return sander.readFile(`${resourceDir}${reqParamsObject['0']}.json`, {'encoding': 'utf-8'});
                        //.then(data => { getResponse(null, data, 'application/json'); })
                // .catch(err => { getResponse(err); });
            }
        });
        // .catch(err => { getResponse(err); });
};

module.exports = getHandler;