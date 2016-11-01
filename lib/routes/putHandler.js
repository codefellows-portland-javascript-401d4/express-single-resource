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
    var newJsonObject = {};
    var origJsonObject = {};
    var parsedName = reqParamsObject['id'];
    var reqUrl = `${resourceDir}${parsedName}.json`;
    return sander
        .exists( reqUrl )
        .then( existence => {
            if (!existence) {
                return sander.writeFile(reqUrl, req.bodyData);
            } else {
                newJsonObject = JSON.parse(req.bodyData);
                return sander
                    .readFile(reqUrl, {'encoding': 'utf-8'})
                    .then(olddata => {
                        origJsonObject = JSON.parse(olddata);
                        return JSON.stringify(updateJson(origJsonObject, newJsonObject));
                    })
                    .then(data => {
                        return sander.writeFile(reqUrl, data);
                    });
            };
        }
    );
};

module.exports = putHandler;