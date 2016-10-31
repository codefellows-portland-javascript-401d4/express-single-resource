const express = require('express');
const app = express();
const path = require('path');
const dataStore = require('./dataStore');

const notesDir = path.join(__dirname, '../notes');
app.use(express.static(notesDir));