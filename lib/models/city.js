const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: {
    type: String,
    required: true
  },

  population: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('City', citySchema);
