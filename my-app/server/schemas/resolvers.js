const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {

  Query: {
    message: () => {
      return "hello world";
    }
  },

}

module.exports = resolvers;
