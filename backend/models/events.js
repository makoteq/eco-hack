const mongoose = require("mongoose");
const schema = mongoose.Schema;

const eventSchema = new schema({
  mess: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model("events", eventSchema);
