const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  info: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  coords: {
    type: Object || [Object],
    require: true,
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Crowd-sourced-data', DataSchema);
