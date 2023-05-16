const { Schema, model } = require("mongoose");

const donationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Donation = model("Donation", donationSchema);

module.exports = donationSchema;