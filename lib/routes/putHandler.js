const sander = require('sander');
const resourceDir = './lib/models/resources/';

function updateJson(originalJsonData, updatedJsonData) {
    var jsonKeys = Object.keys(updatedJsonData);
    var updatedJsonObject = jsonKeys.reduce((acc, curr) => {
        acc[curr] = updatedJsonData[curr];
        return acc;
    }, originalJsonData);
    return updatedJsonObject;
};

function putHandler(reqParamsObject, req) {
    var body = '';
    var newJsonObject = {};
    var origJsonObject = {};
    var parsedName = reqParamsObject['id'];
    var reqUrl = `${resourceDir}${parsedName}.json`;
    return sander
        .exists( reqUrl )
        .then( existence => {
            req.on('data', data => {
                body += data.toString('utf-8');
            });
            req.on('end', () => {
                if (!existence) {
                    return sander
                        .writeFile(reqUrl, body);
                        // .then(data => { putResponse(null, `<h1>put good, your resource id is ${parsedName}</h1>`); })
                        // .catch(err => { putResponse(err); });
                } else {
                    newJsonObject = JSON.parse(body);
                    return sander
                        .readFile(reqUrl, {'encoding': 'utf-8'})
                        .then(olddata => {
                            origJsonObject = JSON.parse(olddata);
                            return JSON.stringify(updateJson(origJsonObject, newJsonObject));
                        })
                        .then(data => {
                            return sander
                                .writeFile(reqUrl, data);
                                //.then(data => { putResponse(null, `<h1>put good, your resource id is ${parsedName}</h1>`); });
                        });
//                        .catch(err => { putResponse(err); });
                };
            });
        }
    );
};

module.exports = putHandler;