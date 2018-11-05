const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
  name: {
    type: String,
    required: true
  },

  population: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Country', countrySchema);
