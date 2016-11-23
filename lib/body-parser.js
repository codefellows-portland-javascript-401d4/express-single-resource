module.exports = function codeBodyParser() {

  // eslint-disable-next-line no-unused-vars
  return function bodyParser(req, res, next) {

    let body = ''; // eslint-disable-line no-unused-vars

    req.on('data', chunk => { // eslint-disable-line no-unused-vars
      body += chunk; // concatenate data strings
    });

    req.on('end', () => {
      if (body !== '') { // * replaced empty array [] with empty string to align with (let body = '') declaration in code line 6
        req.body = JSON.parse(body); // JSON parse data from body
      }
      next();
    });
  };
};
