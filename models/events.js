const mongoose = require("mongoose");
const schema = mongoose.Schema;

const eventSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    created: {
        time: {
            type: Number,
            required: false,
        },
    },
    description: {
        type: String,
        required: false,
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
    user: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model("events", eventSchema);
