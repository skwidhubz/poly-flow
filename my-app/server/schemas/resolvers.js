const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
// const { signToken } = require("../utils/auth");

const resolvers = {

    Query: {
      message: () => {
        return "hello world";
      }
    },

    Mutation: {
      sendText: async (args) => {
        const textString = await args;
        console.log(textString);
      }
    }


};

module.exports = resolvers;
