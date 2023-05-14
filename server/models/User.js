const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const polySchema = require("./Poly");
const { Data, dataSchema } = require("./Data");

const userSchema = new Schema(
  {
    username: {
      type: String,
      // required: true,
      unique: true,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    savedData: [dataSchema],
    // save and update data from Canvas page to savedData property on this model.
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// query and user and get the amount of polyCanvas they have saved
userSchema.virtual("polyCount").get(function () {
  return this.savedPolys.length;
});

const User = model("User", userSchema);

module.exports = User;
