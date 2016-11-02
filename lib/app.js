/** Created by Gloria Anholt on 10/31/16. **/

const path = require('path');
const express = require('express');
const city = require('../routes/router');

const app = express();

const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));
app.set('view engine', 'pug');

app.use('/api/city', city);

module.exports = app;