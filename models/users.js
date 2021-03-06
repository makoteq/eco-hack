const mongoose = require("mongoose");
// Create Schema
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String
        },
    },
    { strict: false }
);

module.exports = User = mongoose.model("users", UserSchema);