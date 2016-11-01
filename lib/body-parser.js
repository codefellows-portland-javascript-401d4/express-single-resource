module.exports = function createBodyParser() {
  return function bodyParser(request, response, next) {
    let body = '';
    request.on('data', data => {
      body += data;
      console.log(data);
    });

    request.on('end', () => {
      try {
        cb(null, JSON.parse(body));
      }
      catch(err) {
        console.log(err.message);
        cb(err);
      }
    });
  };

};
