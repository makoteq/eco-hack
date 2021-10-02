const mongoose = require("mongoose");
const schema = mongoose.Schema;

const eventSchema = new schema({
  name: {
    type: String,
    required: false,
  },
  date: {
    type: Number,
    required: false,
  },
  time: {
    type: Number,
    required: false,
  },
  lat: {
    type: Number,
    required: false,
  },
  lon: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("events", eventSchema);
