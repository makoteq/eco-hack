const mongoose = require("mongoose");
const schema = mongoose.Schema;

const eventSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  adress: {
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
    required: false,
  },
  lon: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("events", eventSchema);