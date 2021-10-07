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
        referral_code: {
            type: String,
            default: function() {
                let hash = 0;
                for (let i = 0; i < this.email.length; i++) {
                    hash = this.email.charCodeAt(i) + ((hash << 5) - hash);
                }
                let res = (hash & 0x00ffffff).toString(16).toUpperCase();
                return "00000".substring(0, 6 - res.length) + res;
            }
        },
        referred_by: {
            type: String,
            default: null
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    { strict: false }
);

module.exports = User = mongoose.model("users", UserSchema);