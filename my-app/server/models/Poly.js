const { Schema, model } = require("mongoose");
const userSchema = require('./User');

const polySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        params: {
            type: String,
            required: true,
        },
        // access user details to save params to
        // use REF to user ID 
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    },
);

module.exports = polySchema;

