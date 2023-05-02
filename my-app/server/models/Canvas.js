const { Schema, model } = require("mongoose");
const userSchema = require('./User');

const canvasSchema = new Schema(
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
        username: [userSchema], 
    },
);


