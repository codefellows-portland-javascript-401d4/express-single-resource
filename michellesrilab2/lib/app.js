const express = require('express');
const app = express();
const errorHandler = require('./errorHandler');
const cityRoutes = require('./routes/cityRoutes');

app.use('/api/cities', cityRoutes);
app.use(errorHandler);


module.exports = app;
