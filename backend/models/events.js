const mongoose = require("mongoose");
const schema = mongoose.Schema;

const eventSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  created:{
  time:{
      type:Number,
      required: false,
    },
  },
  type: {
    type: Number,
    required: false,
  },
  time: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("events", eventSchema);