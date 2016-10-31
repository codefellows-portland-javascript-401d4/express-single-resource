const badRequestHandler = {};

module.exports = function badRequestHandler(req, res) {
  res.statusCode = 400;
  res.setHeader('Content-Type', 'text/html');
  res.write(`<h1>Hello visitor. You asked for ${req.url}.</h1><h2>I don't really have anything special for you based on that url.</h2>`);
  res.end();
};





