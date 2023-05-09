const { AuthenticationError } = require("apollo-server-express");
const { User, Data } = require("../models");
const { signToken } = require("../utils/auth");
const mongoose = require("mongoose");


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // check if users exist
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },

    // query saved data params
    params: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData.savedData;
      }
    },
  },



  Mutation: {
    // saving # of circles and hue from canvas as object 
    saveData: async (parent, {input}, context) => {
      const params = await Data.create(input);
      const user = await User.findByIdAndUpdate(
        context.user._id,
        {$push: {
          savedData: params
        }}
        );
      return { params, user };
    },

    deleteData: async (parent, {dataID}, context) => {
      console.log(dataID);
      console.log(context.user._id)
      const params = await Data.deleteOne({_id : dataID});
      const user = await User.findByIdAndUpdate(
        context.user._id,
        {$pull: {
          savedData: {
            _id: mongoose.Types.ObjectId(dataID)
          }}
        }
        );
        console.log(user.email)
      return user;
    },
    
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      // check if user exists with email and credentials
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPassword = await user.isCorrectPassword(password);

      // check password
      if (!correctPassword) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    savePoly: async (parent, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedPolys: input } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removePoly: async (parent, { polyId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedPolys: { polyId: polyId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
