const sander = require('sander');
const resourceDir = './resources';

function getHandler(reqParamsObject, getResponse) {
    var firstArg = reqParamsObject['0'];
    sander
        .readdir( resourceDir )
        .then( data => {
            if ( firstArg === '' || firstArg === '/') getResponse(null, JSON.stringify({data: data}), 'application/json');
            else sander
                .readFile(`${resourceDir}${reqParamsObject['0']}.json`, {'encoding': 'utf-8'})
                .then(data => { getResponse(null, data, 'application/json'); })
                .catch(err => { getResponse(err); });
        })
        .catch(err => { getResponse(err); });
};

module.exports = getHandler;