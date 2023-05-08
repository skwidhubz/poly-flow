const { Schema, model } = require("mongoose");

const dataSchema = new Schema(
    {
        params: {
            type: String,
            required: true,
        },
        

    },
);

const Data = model("Data", dataSchema);

module.exports = { Data, dataSchema };