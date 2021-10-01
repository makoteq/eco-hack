const mongoose = require("mongoose");
const schema = mongoose.Schema;

const roomSchema = new schema({
  code: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },

  yes: {
    type: Number,
    required: false,
  },
  no: {
    type: Number,
    required: false,
  },
  logs: [{ time: String, vote: Boolean }],
  socket: {
    type: String,
  },
});

module.exports = mongoose.model("rooms", roomSchema);
