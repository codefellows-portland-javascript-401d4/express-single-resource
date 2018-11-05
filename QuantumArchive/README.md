#Single Page Resource Promises and Express!

-I promise this will work expressly!

###Author

Chris Bruner

###Version

V1.1.0

-Have made errorHandling and handling of requests more modular

-Same rules apply as previous version if you wish to query the API

v1.0.0

-All Restful methods for GET/PUT/POST/DELETE have been implemented with FS to act as persistence

-To return a list of all available files, simply go to url /cats

-To return a specifc resource, we you must use an ID as part of the URL (e.g. /cats/1, /cats/2, etc.)

* Note: if you wish to view the application/json, you must designate this in your headers otherwise resources will be returned in text/html

-To PUT data in, you must send a JSON file (emphasis on this) and set the Headers to 'package/json' with requested id number (e.g. cats/1)

-To POST, you must send a JSON file, and direct the url to /cats otherwise it will not work and return an error

-To Delete, simply point to the file you wish to delete (e.g. /cats/0);

-To talk to the server, which will be held on localhost, you need to specificy your request method, and the request url should contain what you need

* To get all cats: http://localhost:8999/cats/

* All requests must be directed to the cats API, where :id is the unique id given for each resource at the time of creation http://localhost:8999/cats/:id

-Code Example of a GET request using SuperAgent on Javascript ECMA6:

```javascript

const request = require('superagent');

request
    .get('http://localhost:8999/cats/0')
    .set('Content-Type', 'application/json')
    .end((err,data) => {
        if (err) return err;
        else console.log(data.body);
    })

```