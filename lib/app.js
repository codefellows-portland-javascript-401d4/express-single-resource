const express = require('express');
const app = express();
const path = require('path');
const fileStore = require('./file-store/fileStore');

const pubDir = path.join(__dirname, '../public');
app.use(express.static(pubDir));

app.set('view engine', 'pug');


module.exports = app;