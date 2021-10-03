const mongoose = require("mongoose");
const schema = mongoose.Schema;

const eventSchema = new schema({
  name: {
    type: String,
    required: false,
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
  date: {
    type: String,
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