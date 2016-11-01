const sander = require('sander');
const resourceDir = './resources/';

function getHandler(req, getResponse) {
    sander
        .readdir( resourceDir )
        .then( data => {
            // console.log('***req.params***', req.params);
            if (req.params === '{}') {
                getResponse(null, data.toString(), 'text/plain');
            }
            else sander
                .readFile(`${resourceDir}${req.params.id}.json`, {'encoding': 'utf-8'})
                .then(data => { getResponse(null, data, 'application/json'); })
                .catch(err => { getResponse(err); });
        })
        .catch(err => { getResponse(err); });

};

module.exports = getHandler;