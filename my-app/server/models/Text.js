const { Schema, model } = require("mongoose");

const textSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
    }
);

module.export = textSchema;